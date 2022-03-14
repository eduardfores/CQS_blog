async function generateUploadUrl(imageName) {

    const params = ({
        Bucket: BUCKET_NAME + "/assets/img",
        Key: imageName,
        Expires: 60
    });

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL;
}





