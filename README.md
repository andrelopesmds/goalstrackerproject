[![Build Status](https://travis-ci.org/andrelopesmds/goalstrackerproject.svg?branch=master)](https://travis-ci.org/andrelopesmds/goalstrackerproject)

# GoalsTracker's overview

Track your favorite team and send web push notifications when a match starts, ends or the team scores a goal.

User subscribes to web push notifications on a responsive website. A crawler running on the server side harversters the web for matches events. Another service notifies the subscribers when an event occours.

<table cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: none;">
  <tr>
    <td align="center" valign="center">
      <img src="images/subscription.jpg" alt="the picture is not yet loaded." style="height:750px; width:580px;"/>
      <br />
    </td>
    <td align="center" valign="center">
      <img src="images/message.jpg" alt="the picture is not yet loaded." style="height:750px; width:580px;"/>
      <br />
    </td>
  </tr>
</table>

## Architecture

The application runs on AWS. S3 bucket is used to host the static Frontend. When the users subscribes, a service worker is installed on the browser and its endpoint is sent to the backend. The request reaches the API Gateway and then a Lambda function saves the subscription into DynamoDB. Meanwhile, there is a docker container, running inside an EC2 instance, harversting the web for matches events. Once an event of the team is detected, it calls another Lambda funtion to gather active user's endpoints and send web push notifications to them. On the browser, the service worker pop ups the notifications.

<p align="center">
  <img src="images/architecture.png" alt="the picture has not been loaded yet."/>
</p>

Note: Currently, we support two teams: Galo (brazilian football) and HIFK (finnish ice hockey), that's why there are two different static pages and web crawlers.


