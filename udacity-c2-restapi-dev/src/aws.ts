import AWS = require('aws-sdk');
import { config } from './config/config';

// LOGGING
const { loggers } = require('winston')
const logger = loggers.get('my-logger')
logger.info('Logging something in file1.js')


const c = config.dev;

//Configure AWS
var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_reigion,
  params: {Bucket: c.aws_media_bucket}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{
  const signedUrlExpireSeconds = 60 * 5
    console.log("AWS getGetSignedUrl");
    const url: string = s3.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
      });

    return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){
    const signedUrlExpireSeconds = 60 * 5
    console.log("AWS getPutSignedUrl");
    const url = s3.getSignedUrl('putObject', {
      Bucket: c.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return url;
}