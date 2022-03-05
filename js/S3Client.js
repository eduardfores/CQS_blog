var S3ClientFactory = {};
S3ClientFactory.newClient = function (config) {
    var albumBucketName = BUCKET_NAME;

    AWS.config.region = REGION_NAME;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID,
    });

    // Create a new service object
    var s3 = new AWS.S3({
        apiVersion: '2022-03-04',
        params: { Bucket: albumBucketName }
    });
  
    return s3;
};

// List the photo albums that exist in the bucket.
function listAlbums() {
    var s3 = S3ClientFactory.newClient();

    var result = s3.listObjects({ Delimiter: '/posts' }, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
    });
}
  