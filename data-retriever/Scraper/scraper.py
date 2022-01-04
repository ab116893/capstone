# -*- coding: utf-8 -*-
"""
Created on Sat Oct 13 14:39:56 2018

@author: sudar
"""

from bs4 import Tag, BeautifulSoup
import requests
import csv
import numpy as np
import pandas as pd
from url_feeder import *
import re
import traceback

# ===========================Retrieve Data================================= 

def get_company_management(urls):
    board_members = []
    for i in urls:     
        response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
        soup = BeautifulSoup(response.content, 'html.parser')
        #identify table we want to scrape
        officer_table = soup.find('table', {"class" : "dataTable"})
        #try clause to skip any companies with missing/empty board member tables
        try: 
            print("="*10+"From Reuter"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
            ticker = i.strip("https://www.reuters.com/finance/stocks/company-officers/")
            ticker = re.sub('\..*$','',str(ticker))
        #loop through table, grab each of the 4 columns shown (try one of the links yourself to see the layout)
            for row in officer_table.find_all('tr'):
                cols = row.find_all('td')
                if len(cols) == 4:
                    #Check to see if this page has table or not
                    if len(officer_table) != 0:       
                    #######################################################################
                        board_members.append((cols[0].text.strip(), cols[3].text.strip(), cols[2].text.strip(), cols[1].text.strip(), ticker))
                    #convert output to new array, check length (Using numpy)
                        board_array = np.asarray(board_members)
                        len(board_array)
                            #convert new array to dataframe (Using Panda)
                        df = pd.DataFrame(board_array)
                        #rename columns, check output
                        df.columns = ['name','position', 'yearjoin','age','ticker']
                        df.head(10)
                        df.to_csv('../data/company-officers.csv')
                                        
        except Exception as e:
            
            print(traceback.format_exc())
        
def get_financial_highlights(urls):
    data = dict()
    data['URL'] = []
    data['title'] = []
    data['# of Estimates'] = []
    data['Mean'] = []
    data['High'] = []
    data['Low'] = []
    data['1 Year Ago'] = []
    for i in urls:     
        response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
        soup = BeautifulSoup(response.content, 'html.parser')
        #identify table we want to scrape
        financial_tables = soup.find_all('table', {"class" : "dataTable"})
        #try clause to skip any companies with missing/empty board member tables
        try: 
            print("="*10+"From Reuter"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
        #loop through table, grab each of the 4 columns shown (try one of the links yourself to see the layout)
            for table in financial_tables:
                #print (table)
                for row in table.find_all('tr'):
                    cols = row.find_all('td')
                    if len(cols) == 6:
                        if len(row.previous_sibling.previous_sibling.find_all('td')) == 1:
                            print(row)
                            title = row.previous_sibling.previous_sibling.td.text
                            data['URL'].extend(('-', i))
                            data['title'].extend((title, '-'))
                            data['# of Estimates'].extend(('-', cols[0].text.strip()))
                            data['Mean'].extend(('-',cols[1].text.strip()))
                            data['High'].extend(('-',cols[2].text.strip()))
                            data['Low'].extend(('-',cols[3].text.strip()))
                            data['1 Year Ago'].extend(('-',cols[4].text.strip()))
                        else:
                            data['URL'].append(i)
                            data['title'].append('-')
                            data['# of Estimates'].append(cols[0].text.strip())
                            data['Mean'].append(cols[1].text.strip())
                            data['High'].append(cols[2].text.strip())
                            data['Low'].append(cols[3].text.strip())
                            data['1 Year Ago'].append(cols[4].text.strip())
                            print (len(cols))
                            print (cols)
            print (data)
            df = pd.DataFrame(data, columns=['URL', 'title', '# of Estimates', 'Mean',  'High', 'Low', '1 Year Ago'])           
            df.to_csv('../data/financial-highlights.csv')        
                    
                                      
        except:
            pass     

def get_analyst(urls):
    board_members = []
    for i in urls:     
        response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
        soup = BeautifulSoup(response.content, 'html.parser')
        #identify table we want to scrape
        analyst_table = soup.find('table', {"class" : "dataTable"}).parent.parent.next_sibling.next_sibling.next_sibling.next_sibling.find('table', {"class" : "dataTable"})
        try: 
            print("="*10+"From Reuter"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
            for row in analyst_table.find_all('tr'):
                cols = row.find_all('td')
                if len(cols) == 5:
                    #Check to see if this page has table or not
                    if len(analyst_table) != 0:       
                    #######################################################################
                        board_members.append((i, cols[0].text.strip(), cols[1].text.strip(), cols[2].text.strip(), cols[3].text.strip(), cols[4].text.strip()))
                        #convert output to new array, check length (Using numpy)
                        board_array = np.asarray(board_members)
                        len(board_array)
                        #convert new array to dataframe (Using Panda)
                        df = pd.DataFrame(board_array)
                        #rename columns, check output
                        df.columns = ['URL', '1-5 Linear Scale', 'Current', '1 Month Ago','2 Month Ago', '3 Month Ago']
                        df.head(10)
                        df.to_csv('../data/analyst.csv')
                                            
        except:
            pass
def get_overview(urls):
    about = []
    data = dict()
    data['URL'] = []
    data['Beta'] = []
    data['Market Cap(Mil.)'] = []
    data['Shares Outstanding(Mil.)'] = []
    data['Dividend:'] = []
    data['Yield (%)'] = []
    data['About'] = []
    try:
        for i in urls:     
            response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
            soup = BeautifulSoup(response.content, 'html.parser')
            #identify table we want to scrape
            overview_table = soup.find('table', {"class" : "dataTable"})
            description = soup.find('div', {'class':'columnRight'})
        #try clause to skip any companies with missing/empty board member tables
            print("="*10+"From Reuter"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
        #loop through table, grab each of the 4 columns shown (try one of the links yourself to see the layout)
            for row in overview_table.find_all('tr'):
                cols = row.find_all('td')
                #print(description)
                if len(cols) == 2:
                    if re.search("Beta", cols[0].text):
                        data['Beta'].append(cols[1].text)
                        data['URL'].append(i)
                    if re.search("Market Cap", cols[0].text):
                        data['Market Cap(Mil.)'].append(cols[1].text)
                    if re.search("Shares Outstanding", cols[0].text):
                        data['Shares Outstanding(Mil.)'].append(cols[1].text)
                    if re.search("Dividend", cols[0].text):
                        data['Dividend:'].append(cols[1].text)
                    if re.search("Yield", cols[0].text):
                        data['Yield (%)'].append(cols[1].text)
            for items in description:
                item = items.find('div', {'class':'moduleBody'})
                data['About'].append(item.text.strip())
                df = pd.DataFrame(data, columns=['URL', 'Beta', 'Market Cap(Mil.)', 'Shares Outstanding(Mil.)',  'Dividend:', 'Yield (%)', 'About'])           
                df.to_csv('../data/overview.csv')     
    except:
        print("Error on Scraping")
        
def get_industry(urls):
    data = dict()
    data['Company Code']=[]
    data['Sector'] = []
    data['Industry'] = []
    data['Competition'] = []
    data['Division'] = []
    data['Revenue'] = []
    data['Income'] = []
    data['Margin'] = []
    data['Ticker'] = []
    for i in urls:     
        response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
        soup = BeautifulSoup(response.content, 'html.parser')
        overview_table = soup.find('table', {"class" : "Industry_tablica"})
        main_table = soup.find('table', {"class" : "osnovna_tablica_bez_gifa"})
###########################################################################################
        try: 
            print("="*10+"From Reuter"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
######get sector and industry information from overview table, and store those information into data dictionary
            for row in overview_table.find_all('td', {"class" : "industname"}):
                sector = row.find('td', {"class" : "wsnw al"}).a.contents[2]
                data['Sector'].append(sector.lstrip())
                industry = row.find('td', {"class" : "wsnw al"}).a.next_sibling.next_sibling.next_sibling.next_sibling.contents[2]
                data['Industry'].append(industry)
                company_name = i.strip('https://csimarket.com/stocks/competition.php?code=')
                data['Company Code'].append(company_name)
                
###Get Each row of the data and list comprehension to get each company competitor##############
            competition_name = [name.a.contents[0] for name in main_table.find_all('td',{'class':'svjetlirub11 block al'})]
            data['Competition'].append(competition_name)
            ticker_list = [ticker.contents[0] for ticker in main_table.find_all('td',{'class' : 'plavac svjetlirub al dae'})]
            data['Ticker'].append(ticker_list)
            division_name = [div.a.contents[0] for div in main_table.find_all('td',{'class' : 'svjetlirub11 block'})]
            data['Division'].append(division_name)
            
### Get the revenue， income, and margin
            number =  main_table.find_all('td', {'class':'f11 svjetlirub ddd'})
            income = main_table.find_all('td', {'class':'svjetlirub11'})
            #print (number)
            revenue_list = []
            income_list=[]
            margin_list =[]
            for item in number:
                if item.find('span')!=None:
                    revenue = item.find('span')
                    clean_revenue = re.sub(r'[^\d\,\.]','', str(revenue))   #to strip all whitespaces
                    revenue_list.append(clean_revenue)
                else:
                    margin = item.text
                    margin_list.append(margin) 
             
            data['Revenue'].append(revenue_list)
            data['Margin'].append(margin_list)
            for item in income:
                if item.find('span')!=None:
                    
                    income = item.find('span')
                    clean_income = re.sub(r'[^\d\,\.]','', str(income))     #to strip all whitespaces
                    income_list.append(clean_income)
            data['Income'].append(income_list)         
            
                    
            
            #print (data)
            print (len(data['Sector']),  len(data['Industry']), len(data['Competition']), len(data['Division']), len(data['Revenue']), len(data['Income']),len(data['Margin']),len(data['Ticker']))
            df = pd.DataFrame(data, columns=['Company Code', 'Sector', 'Industry', 'Competition','Division','Revenue','Income','Income', 'Ticker'])           
            df.to_csv('../data/industry.csv')
            
            

#        
        #get the rest of needed information from main_table, and store those information into data dictionary accordingly
           #     df = pd.DataFrame(data, columns=['URL', 'Sector','Industry','Competition','Division', 'Revenue','Income', 'Margin','Ticker'])           
#                df.to_csv('../data/industry.csv') 
        
        except Exception as e:
            print(traceback.format_exc())

def get_segment(urls):
    data = dict()
    #data['Ticker']=[]
    data['Description'] = []
    for i in urls:     
        response = requests.get(i, headers={'User-Agent': 'Chrome/60.0.3112.113'})
        soup = BeautifulSoup(response.content, 'html.parser')
        main_table = soup.find('table', {"class" : "tlh18"})
###########################################################################################
        try: 
            print("="*10+"From CIS"+"="*10)
            print("Data is pulling from this URL: " + i)
            print("="*10+"DONE"+"="*10)
######get sector and industry information from overview table, and store those information into data dictionary
            text = ''
            for tr in main_table:
                if isinstance(tr, Tag):
                    content = tr.find('td').next_sibling.next_sibling
                    title = content.span.text
                    sub_title = content.h2.text
                    text = title+ '\n'+ sub_title
                    body = content.find_all('p')
                    for para in body:
                        text = text+ para.text+'\n'
                    data['Description'].append(text)
            df = pd.DataFrame(data, columns=['Description'])           
            df.to_csv('../data/segments.csv')
        except Exception as e:
            print(traceback.format_exc())
#####Uncomment to test######      
# ===========================Retrieval Source=============================
            
if __name__== "__main__":
    section = str(input("please input your section: "))
    if section == 'company-officers':
        company_management = url_feeder(section)
        urls = company_management.feeder()
        get_company_management(urls)
    if section == 'financial-highlights':
        financial = url_feeder(section)
        urls = financial.feeder()
        get_financial_highlights(urls)
    if section == 'analyst':
        analyst = url_feeder(section)
        urls = analyst.feeder()
        get_analyst(urls)
    if section == 'overview':
        overview = url_feeder(section)
        urls = overview.feeder()
        get_overview(urls)
    if section == 'industry':
        industry = url_feeder(section)
        urls = industry.feeder()
        get_industry(urls)
    if section == 'segment':
        segment = url_feeder(section)
        urls = segment.feeder()
        get_segment(urls)

    

    

    
















