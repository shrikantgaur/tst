  const data = [
    {
      id: 1,
      nativeLang: "Hello",
      targetLang: "Hello R",
      options: ["Hello R", "india", "US", "world"]
    },
    {
      id: 2,
      nativeLang: "Word",
      targetLang: "Word R",
      options: ["Word", "Word55", "Word11", "Word333"]
    },
    {
      id: 3,
      nativeLang: "India",
      targetLang: "India R",
      options: ["India R", "india", "US", "Canada"]
    }
  ];

  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");
  const optionFontSize = 32;
  const optionMargin = 20;
  const dropSpeed = 1;
  const translationMargin = 40;
  const maxOptions = 50;
  const maxCanvasHeight = 400;
  let currentOptions = [];
  let currentTranslationIndex = 0;
  let currentOptionIndex = 0;

  // Set canvas width to full window width
  canvas.width = window.innerWidth;
  const canvasWidth = canvas.width;

  context.font = `${optionFontSize}px Arial`;

  function createDrop(x, y, optionText) {
    return {
      x,
      y,
      text: optionText,
      speed: dropSpeed
    };
  }

  function calculateCanvasHeight() {
    const optionsCount = data.reduce((count, obj) => count + obj.options.length, 0);
    const translationsCount = data.length;
    const totalMargin = (translationsCount + 1) * translationMargin;
    const optionsHeight = optionsCount * (optionFontSize + optionMargin);
    return Math.min(optionsHeight + totalMargin, maxCanvasHeight);
  }

  function adjustCanvasSize() {
    const canvasHeight = calculateCanvasHeight();
    canvas.height = canvasHeight;
  }

  function animate() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Check if current options have reached the bottom
    if (
      currentOptions.length === 0 ||
      currentOptions[currentOptions.length - 1].y > canvas.height
    ) {
      // Move to the next item and reset option index
      currentTranslationIndex++;
      currentOptionIndex = 0;

      // Wrap around to the first item if reached the end
      if (currentTranslationIndex >= data.length) {
        currentTranslationIndex = 0;
      }

      // Get the options for the current item
      const options = data[currentTranslationIndex].options;

      // Randomize the options order
      const shuffledOptions = shuffleArray(options);

      // Create new drops for the options
      currentOptions = shuffledOptions.slice(0, maxOptions).map((option, index) => {
        const dropX = Math.random() * (canvasWidth - optionMargin) + optionMargin;
        const dropY = -(index + 1) * (optionFontSize + optionMargin);
        return createDrop(dropX, dropY, option);
      });

      adjustCanvasSize(); // Adjust canvas size based on the number of options
    }

    currentOptions.forEach(drop => {
      // Update drop position
      drop.y += drop.speed;

      // Draw the drop on the canvas
      context.fillText(drop.text, drop.x, drop.y);
    });

    requestAnimationFrame(animate);
  }

  function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  adjustCanvasSize(); // Adjust canvas size initially
  animate();
