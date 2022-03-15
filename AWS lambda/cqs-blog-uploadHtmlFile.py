import json
import base64
import boto3
import email

ACCESS_KEY='access_key'
SECRET_KEY='secret_key'
BUCKET_NAME='bucket_name'
PATH_IMG='directory images' #e.g. assets/img/

def lambda_handler(event, context):
    s3 = boto3.client("s3",aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

    # decoding form-data into bytes
    post_data = base64.b64decode(event["body"])
    # fetching content-type
    try:
        content_type = event["headers"]["content-type"]
    except:
        content_type = event["headers"]["content-type"]
    # concate Content-Type: with content_type from event
    ct = "Content-Type: " + content_type + "\n"

    # parsing message from bytes
    msg = email.message_from_bytes(ct.encode() + post_data)

    # checking if the message is multipart
    print("Multipart check : ", msg.is_multipart())

    # if message is multipart
    if msg.is_multipart():
        multipart_content = {}
        # retrieving form-data
        for part in msg.get_payload():
            # checking if filename exist as a part of content-disposition header
            if part.get_filename():
                # fetching the filename
                file_name = part.get_filename()
            multipart_content[
                part.get_param("name", header="content-disposition")
            ] = part.get_payload(decode=True)

        # filename from form-data
        # file_name = json.loads(multipart_content["Metadata"])["filename"]
        # u uploading file to S3
        s3_upload = s3.put_object(
            Bucket=BUCKET_NAME, Key=PATH_IMG + file_name, Body=multipart_content["file"]
        )

        # on upload success
        return {"statusCode": 200, "body": json.dumps("File uploaded successfully!")}
    else:
        # on upload failure
        return {"statusCode": 500, "body": json.dumps("Upload failed!")}