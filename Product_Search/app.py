from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

def search_product_images_with_selenium(query):
    options = Options()
    options.add_argument("--headless")  # Ensure it runs in headless mode
    options.add_argument("--no-sandbox")  # Required for certain environments like Render
    options.add_argument("--disable-dev-shm-usage")  # Necessary for Docker containers and Render
    options.add_argument("--remote-debugging-port=9222")  # Optional, enables debugging
   options.binary_location = "/opt/homebrew/bin/chromium"  # Point to the Chromium binary

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    search_urls = {
        "amazon": f"https://www.amazon.in/s?k={query.replace(' ', '+')}",
        "flipkart": f"https://www.flipkart.com/search?q={query.replace(' ', '+')}"
    }

    product_images = {}

    try:
        for platform, search_url in search_urls.items():
            driver.get(search_url)

            WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'img')))
            
            image_elements = driver.find_elements(By.TAG_NAME, 'img')
            images = []
            for idx, img in enumerate(image_elements):
                src = img.get_attribute('src')
                if src:
                    images.append(src)

            # Remove the first and last 6 images
            product_images[platform] = images[6:-6] if len(images) > 12 else []

    except Exception as e:
        print(f"Error: {e}")
    finally:
        driver.quit()

    return product_images


@app.route("/search", methods=["GET"])
def search():
    user_query = request.args.get("query")
    print("*************")
    if user_query:
        product_images = search_product_images_with_selenium(user_query)
        return jsonify(product_images)
    else:
        return jsonify({"error": "No query parameter provided"}), 400

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)

