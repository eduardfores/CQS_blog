import json
import boto3
import datetime
import urllib.parse

ACCESS_KEY=''
SECRET_KEY=''
BUCKET_NAME='cqs-blog'
TEMPALTE_FILE='post_template.html'
POSTS_PATH='posts/'

MONTH_IN_YEAR = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 'September', 
    'October', 'November', 'December']
    
KEY_TEMPLATE = [
    "${background}","${title}","${sub-title}",
    "${posted-by-linked}","${posted-by}","${date_today}",
    "${post_message_body}","${texted-by-link}","${texted-by}",
    "${images-by-link}","${images-by}",
    ]
    
KEY_JSON = ["background","title", "sub-title",
    "posted-by-link", "posted-by", "date",
    "message", "texted-by-link", "texted-by",
    "images-by-link", "images-by"
]

def transform_data_json(eventBody):
    eventBody = eventBody.replace("+", " ")
    body = eventBody.split("&")
    
    body_map = {}
    
    for param in body:
        list = param.split("=")
        body_map[list[0]] = list[1]
    
    body_map["date"] = date_util()
    body_json_dump = json.dumps(body_map)
    body_json = json.loads(body_json_dump)
    
    return body_json

def date_util():
    mydate = datetime.datetime.now()
    month = mydate.strftime("%B")
    year = mydate.strftime("%Y")
    day = mydate.strftime("%d")
    
    return str(month + " "+ day + ", "+ year)
    
    
def get_s3_post_template():
    s3 = boto3.resource('s3')
    obj = s3.Object(BUCKET_NAME, TEMPALTE_FILE)
    html = obj.get()['Body'].read().decode('utf-8')
    
    return html
    
def generate_html(html, json):
    html = replace_keys_in_html(html, json)
    
    return upload_html_s3(html, json['title'])
    
def replace_keys_in_html(html, json):
    for idx, element in enumerate(KEY_JSON):
        html = html.replace(KEY_TEMPLATE[idx], urllib.parse.unquote(json[element]))
        
    return html
    
def upload_html_s3(html,title):
    encoded_string = html.encode("utf-8")
    title = title.replace(" ", "_")+".html"
    
    s3 = boto3.client("s3",aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    
    return s3.put_object(ACL='public-read', Bucket=BUCKET_NAME, 
    Key=POSTS_PATH + title, Body=encoded_string,
        CacheControl="max-age=0,no-cache,no-store,must-revalidate",
        ContentType="text/html")
    
    
def lambda_handler(event, context):
    
    body_json = transform_data_json(event['body'])
    
    html = get_s3_post_template()
    
    response = generate_html(html, body_json)
    
    print(response)
    json_resp_str = json.dumps(response)
    json_resp = json.loads(json_resp_str)
    
    print (response['ResponseMetadata']['HTTPStatusCode'])
    
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        return {"statusCode": 200, "body": json.dumps("HTML generated successfully!")}
    else:
        return {"statusCode": 500, "body": json.dumps(response)}
    