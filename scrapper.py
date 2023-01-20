from bs4 import BeautifulSoup
import requests
from datetime import datetime
import pandas as pd


url_list = [
	{"country":"Kenya",	"domain":"jumia.co.ke"},
	{"country":"Uganda"  ,"domain":	"jumia.ug"},
	{"country":"Nigeria"  ,"domain":"jumia.com.ng"},
]
# url = "https://www.jumia.com.eg/catalog/?q=sugar&page=1#catalog-listing"

max_page = 50
products_list = []
price_list = []
country_list = []
date_list = []

def scapper(nodes, country):
	for node in nodes:
		product_name = node.find('h3',{ "class": "name"}).text
		product_price = node.find('div',{ "class": "prc"}).text
		products_list.append(product_name)
		price_list.append(product_price)
		country_list.append(country)
		date_list.append(datetime.now())

	

def process_page(domain, max_page, country):
	page = 0
	while page < max_page :
		web_page = requests.get(f"https://{domain}/catalog/?q=sugar&page={page}#catalog-listing")
		doc = BeautifulSoup(web_page.content,"html.parser")
		parent = doc.find('div',{ "class": "-paxs row _no-g _4cl-3cm-shs"})
		# child = parent.find_all('a', {"class":"core" })
		child_list = parent.find_all("div",{"class":"info"})
		# print(child_list)                   
		scapper(child_list, country)
		progress = (page/max_page)*100, 
		print("Scrape completed for : ",domain," Page: ", page, " country: ",country, " , ", progress,"%" )
		page = page + 1
		

for item in url_list:
	process_page(item["domain"], max_page, item["country"])



# Create dataframe
print("Creating dataframe from the scrapped data ...")
df = pd.DataFrame(list(zip(products_list, price_list, country_list, date_list)),columns =['Name', 'Price','Country','Date'])
print("DataFrame created successfully.")

# Save the scapped data to a csv file in the current working dorectory
print("Writinng data in DataFrame to 'scrapped_data.csv' ...")
df.to_csv("scrapped_data.csv")
print("Process completed.")







