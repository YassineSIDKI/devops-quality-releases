# #!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

Locators = {'id_username': 'user-name', 'id_password': 'password', 'id_login': 'login-button',
            'class_add_to_cart': 'btn_primary', 'class_remove': 'btn_secondary '}

# Start the browser and login with standard_user


def login(user, password):
    print('Starting the browser...')
    options = ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(options=options)
    #driver = webdriver.Chrome('/Users/administrateur/chromedriver')
    print('Browser started successfully. Navigating to the demo page to login.')
    driver.get('https://www.saucedemo.com/')

    print('Fill form with user credentials')
    driver.find_element_by_id(Locators['id_username']).send_keys(user)
    driver.find_element_by_id(Locators['id_password']).send_keys(password)

    print('Log in with user : username='+user + ' password='+password)
    driver.find_element_by_id(Locators['id_login']).click()

    print('Add all element to cart')
    list_add_to_cart = driver.find_elements_by_class_name(
        Locators['class_add_to_cart'])
    for element in list_add_to_cart:
        element.click()

    print('Remove all element from cart')
    list_remove = driver.find_elements_by_class_name(
        Locators['class_remove'])
    for element in list_remove:
        element.click()

    print('Check if all remove buttons changed to add to cart buttons')
    list_add_to_cart_after_test = driver.find_elements_by_class_name(
        Locators['class_add_to_cart'])

    assert len(
        list_add_to_cart_after_test) > 0, 'There is no add to cart button ==> test failed'

    print('test passed')


login('standard_user', 'secret_sauce')
