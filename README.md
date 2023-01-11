# Hey, Ye - The App Nobody Needs
A chat app where your only contact is Kanye. Using the kanye.rest api you can chat and receive special quotes from kanye himself.

Built with React Native, and tested on iPhone SE 2nd Gen

## Media
### Text:
<img src="/media/heyye_message.gif" width="40%">

### Get Pictures:
<img src="/media/heyye_get_pic.gif" width="40%">

### Send Pictures:
<img src="/media/heyye_send_pic.gif" width="40%">

### Miscellaneous Screenshots:
<p float="left">
<img src="/media/01.png" width="25%">
<img src="/media/02.png" width="25%">
<img src="/media/03.png" width="25%">
</p>

## How Does It Work?

### Kanye Quotes:
I start by using the [Kanye.Rest](https://kanye.rest/) API to fetch a random quote. I encapsulated this in my own API, made with NodeJS and Express, since I had to use it to manage the pictures anyways.

### Sending Images:
Using the [Expo-Camera](https://docs.expo.dev/versions/latest/sdk/camera/) package I simply created a Camera screen in my navigation. Once a picture is take you are prompted to keep or delete it. If you decide to keep it, the Base64 value of the image is sent to my API, along with its width and height. It is then saved to a publicly exposed directory with a unique name as a PNG. The API the responds with the file name and its dimensions. Then I simply reference that as my image source in the message.

### Getting Images:
I have another public directory dedicated to images of Kanye. When the server starts it iterates over all the files in that directory, adds them to a list, along with the image's dimensions. The whenever a GET request comes in for that URL, I pick a random index of that array and respond with that image. Then I can plug that information into the same Image Message component as when sending an image.
