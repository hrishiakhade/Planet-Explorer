# Planet Explorer

A Hybrid mobile application built using React Native framework as a part of final project for the Class INFO I400/I590 Cross Platform Mobile Programming (Fall 2022). I have also added a splash screen and little animation on Home Screen.

This app has 4 sections
1. Home Screen
2. Explore Space
3. Space News
4. NASA Astronomy Picture of the Day


#### 1. Home Screen
  Carousal of Planets , which can be swipe left or right with some sound effect of page swipe.   
 <img src="https://user-images.githubusercontent.com/20705523/200150543-2cbcd943-40f2-4d33-8717-ca2f98ded2e4.jpg" width="250" height="500">
#### 2. Explore Screen
  This sections displays all the images from the searched query . It uses NASA's Media Library API to fetch media. When clicked on the result , it will open the media in a modal along with related information of the picture . I have also implemented Next and Previous button on Modal so that user wont need to close the modal everytime to open consecutive images. 
<p float="left">
  <img src="https://user-images.githubusercontent.com/20705523/200150710-7c38e26a-fbeb-4fb5-9816-2bc4aae861bd.jpg" width="250" height="500">
  <img src="https://user-images.githubusercontent.com/20705523/200150716-57826f63-b0de-4d16-b9b8-df7ac6b782bc.jpg" width="250" height="500">
</p>

#### 3. Space News
  This screen displays all the news related to space . I used Flatlist to display all the news items and also implemented Pull to Refresh feature to fetch the latest news and lazy loading to fetch more news by pagination . You can also share the news with your friends by long pressing on the news . When you click on the news item , it will open the news in in-app browser also provide share option on the broweser screen.
  
<img src="https://user-images.githubusercontent.com/20705523/200150827-311b4926-d53e-46b1-bc7d-e4d6e0a2af1d.jpg" width="250" height="500">

#### 4. NASA Astronomy Picture of the Day
This section uses NASA's Astronomy Picture of the Day API to fetch media everyday as a highlight of the day along with the description of the picture. When you click on the image , it will open the image in full screen where you can zoom in - zoom out . It also provides a option to download the image , it requires some device's local storage permission to store the image in your phone's local storage , inside a folder names 'Planet Explorer' 

<img src="https://user-images.githubusercontent.com/20705523/200150831-d685a692-42c6-4949-980a-9c3afcad5f96.jpg" width="250" height="500">. 

### How to run the App ? 

Before cloning, make sure you have setup the React Native Expo environment on your machine and Expo Go app on your mobile device.

Step 1 :  Clone the App.  
`git clone https://github.com/info-mobile-fa22/p03-final-project-hrishiakhade.git`

Step 2: Install Dependencies.  
  Go to Project Directory `cd p03-final-project-hrishiakhade` and then `npm install`

Step 3: Opne the Expo Go App and scan the QR Code.   
      Run `npx expo run` from project directory and scan QR code from Android or iOS device.
      
#### Note : I have included my personal NASA API KEY and Rapid API key in the `utils/api-helper/index.js` file . It might expire , if you are facing issue with loading data , please generate your own API key from the following websites
1. NASA API : https://api.nasa.gov
2. Rapid API : https://rapidapi.com/newbAPIOfficial/api/planets-info-by-newbapi
