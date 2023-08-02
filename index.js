const fs = require("fs");
const path = require("path");

// Function to create the folder structure and Markdown file
function createMarkdownFile(fileName) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const folderPath = path.join(__dirname, year.toString(), month);
  const filePath = path.join(folderPath, `${formattedDate}_${fileName}.md`);

  // Create the folder structure if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Create the Markdown file with a template
  const markdownTemplate = `# Learning Entry - ${formattedDate}

  ## Type of Learning: [Snippet / Learning / Tool / Language / Win / Bragging]
  
  ### What I've Learned:
  
  [Write here what you've learned during your study, experiment, or exploration. Be as detailed and informative as possible.]`;

  fs.writeFileSync(filePath, markdownTemplate);

  console.log(`Markdown file created: ${filePath}`);
}

// Get the fileName from the command line arguments
const fileName = process.argv[2];

if (!fileName) {
  console.error("Please provide a fileName argument.");
  process.exit(1);
}

createMarkdownFile(fileName);
