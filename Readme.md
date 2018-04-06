Change custom variables in .yml and handler.js file to your s3 bucket's name and table names
Run command 'serverless deploy'
Upon adding any file in S3, dynamoDB database will be updated.

To get the list of the songs:
```
https://2lep5o9dp8.execute-api.us-west-2.amazonaws.com/dev/songs
```

To search the specific song from the list:
```
https://2lep5o9dp8.execute-api.us-west-2.amazonaws.com/dev/songs/{name}
```

To create a new playlist and add a song to it:
```
curl -X POST https://2lep5o9dp8.execute-api.us-west-2.amazonaws.com/dev/songs --data '{ "Name": "File name","Playlist": "Desired list name" }'
```
