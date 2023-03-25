# Linear-Foonda

The app helps students solve algebraic equations with step-by-step guide.

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

![GitHub contributors](https://img.shields.io/github/contributors/techemmy/Linear-Foonda?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/techemmy/Linear-Foonda?style=for-the-badge)
![Stargazers](https://img.shields.io/github/stars/techemmy/Linear-Foonda?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/techemmy/Linear-Foonda?style=for-the-badge)
![Twitter Follow](https://img.shields.io/twitter/follow/techemmy?style=social)

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
    <li><a href="#usage">Usage</a></li>
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
  - Here, I call a method to check if both sides contain a variable e.g `2x` and collect like terms by taking the variables to the left-hand side.
  - Next, I call another method to sum up all the variables and numbers on the left hand side and return them
  - If there is a number returned from the left-hand side, I either add or subtract it from both sides depending on its sign to eliminate it from the left-hand side.
  - Then, I sum up all the numbers on the right-hand side
  - Finally, I divide both sides by the coefficient the variable on the left-hand side to get my final answer
- While the sub-steps of the previous steps are being carried out, I call methods in-between to show the steps on the front-end.
- This way, I solve the problem and explain it to the user at the same time.

The algorithm can get better.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have Node.js [downloaded](https://nodejs.org/en) and installed on your pc.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo

   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Enter your API in `config.js`

   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
  - [ ] Chinese
  - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
