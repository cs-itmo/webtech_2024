# pip3 install selenium
from selenium import webdriver

options = webdriver.ChromeOptions()
browser = webdriver.Chrome(options=options)
browser.get("https://codex.so")
browser.implicitly_wait(3)
browser.save_screenshot("page.png")
browser.quit()