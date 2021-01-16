# #!/usr/bin/env python3
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

Locators = {'id_username': 'user-name', 'id_password': 'password', 'id_login': 'login-button',
            'class_add_to_cart': 'inventory_item', 'class_remove': 'btn_secondary '}

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
        item_name = element.find_element_by_class_name(
            'inventory_item_name').text
        element.find_element_by_class_name('btn_inventory').click()
        print('Added {} to cart'.format(item_name))

    driver.find_element_by_class_name('shopping_cart_link').click()

    for item in driver.find_elements_by_class_name('cart_item'):
        item_name = item.find_element_by_class_name('inventory_item_name').text
        item.find_element_by_class_name('cart_button').click()
        print('Removed {} from cart'.format(item_name))

    driver.find_element_by_class_name('btn_secondary').click()

    print('Check if all remove buttons changed to add to cart buttons')
    list_add_to_cart_after_test = driver.find_elements_by_class_name(
        Locators['class_add_to_cart'])

    assert len(
        list_add_to_cart_after_test) > 0, 'There is no add to cart button ==> test failed'

    print('test passed')


login('standard_user', 'secret_sauce')
