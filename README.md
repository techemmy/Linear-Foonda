# Linear-Foonda

The app helps students solve algebraic equations with step-by-step guide.

![GitHub contributors](https://img.shields.io/github/contributors/techemmy/Linear-Foonda?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/techemmy/Linear-Foonda?style=for-the-badge)
![Stargazers](https://img.shields.io/github/stars/techemmy/Linear-Foonda?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/techemmy/Linear-Foonda?style=for-the-badge)
![Twitter Follow](https://img.shields.io/twitter/follow/itechemmy?style=social)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">How It works</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![App preview](https://i.ibb.co/3WLHV2n/Screenshot-2023-03-25-at-01-34-51.png)

The project runs on an algorithm I developed using the OOP approach. It works with these procedures:

- You type in the equation in the equation in the frontend input box
- On clicking the solve button, I get the equation.
- The first thing I do is to sanitize the equation and make sure it's valid
- Next, I call one of the equation solver class methods to solve the equation. To solve the equation using the following steps:
  - I remove the spaces between the equations
  - Split the equation into two by the equals symbol (`=`) into `left` and `right`
  - I check if there are brackets, expand them and replace the `left` and `right` with the expanded brackets
  - After that, I call a method to check if both sides contain a variable e.g `2x` and collect like terms by taking the variables to the left-hand side.
  - Next, I call another method to sum up all the variables and numbers on the left hand side and return them
  - If there is a number returned from the left-hand side, I either add or subtract it from both sides depending on its sign to eliminate it from the left-hand side.
  - Then, I sum up all the numbers on the right-hand side
  - Finally, I divide both sides by the coefficient the variable on the left-hand side to get my final answer
- While the sub-steps of the previous steps are being carried out, I call methods in-between to show the steps on the front-end.
- This way, I solve the problem and explain it to the user at the same time.

The algorithm can get better.

<p align="right">(<a href="#linear-foonda">back to top</a>)</p>

### Built With

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

<p align="right">(<a href="#linear-foonda">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have Node.js [downloaded](https://nodejs.org/en) and installed on your pc.

### Installation

1. Be positive, it's going to work 😁😅
2. Clone the repo

   ```sh
   git clone https://github.com/techemmy/Linear-Foonda.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Open you terminal and run

   ```sh
   npm start
   ```

5. If it doesn't work, open the `index.html` file in the base directory

<p align="right">(<a href="#linear-foonda">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#linear-foonda">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Emmanuel Oloyede - [@itechemmy](https://twitter.com/itechemmy)

Project Link: [https://github.com/techemmy/Linear-Foonda](https://github.com/techemmy/Linear-Foonda)

<p align="right">(<a href="#linear-foonda">back to top</a>)</p>
