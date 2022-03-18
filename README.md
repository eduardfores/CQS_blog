[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/eduardfores/CQS_blog/blob/main/README_IMGS/Amazon_Web_Services_Logo.png">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Serverless Blog in AWS </h3>

  <p align="center">
    This project is one serveless blog created in AWS using S3, API Gateway and lambdas. 
    <br />
    <br />
    <a href="http://cqs-blog.s3-website.eu-central-1.amazonaws.com/">Demo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

The project is one blog creates in AWS to prevent the server software usage. This types of server could be a problem because they often be hacked.

This blog contribute a new scheme without tomcat, flask or other type of software to prevent the hacks in the web site. Of course, this solution is one example to show how we can prevent the these types of issues in our webs the most important part of the security is in AWS and how we create de IAM credentials and the configuation permissions of the AWS. 

So in this project there are:
* Hosting Static blog in S3
* The blog reads from S3 bucket the posts
* Upload images to S3 with public permissions
* HTML Generation with Lambda functions
* Save HTML files from Lambda to S3   

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section list the frameworks/libraries used to create this blog. 

* [S3 AWS](https://aws.amazon.com/es/s3/)
* [API Gateway AWS] (https://aws.amazon.com/es/api-gateway/)
* [Lambda AWS] (https://aws.amazon.com/es/lambda/)
* [JavaScript](https://www.javascript.com/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/eduardfores/CQS_blog/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/eduard-for%C3%A9s-ferrer-354b61163/