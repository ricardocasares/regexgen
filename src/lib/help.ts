const isMac = () => navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const modKey = () => (isMac() ? "Command" : "Ctrl");

export const help = `RegexGen> Hello! Welcome to RegexGen.
RegexGen> Our mission is to help you write some fancy regexes.
RegexGen> Press ${modKey()}+V to paste from your clipboard.

██╗  ██╗███████╗██╗     ██████╗ 
██║  ██║██╔════╝██║     ██╔══██╗
███████║█████╗  ██║     ██████╔╝
██╔══██║██╔══╝  ██║     ██╔═══╝ 
██║  ██║███████╗███████╗██║     
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     

Try selecting this by line double clicking with your mouse.

Great!, that was easy.
To deselect the line just double click again on it.

The colored blocks are hints for the content types we identified.
Hover with your mouse on a block to know more about it.

Select the following lines and inspect the blocks you find:

    human>    What's your address?
    mr.robot> 173.38.220.55
    human>    No, your local address?
    mr.robot> 127.0.0.1
    human>    No, I mean, what's your physical address?
    mr.robot> 0123.4567.89ab
    human>    #omg 🤦

By clicking a block you create a regex for that content type.
When more than one line is selected a regex is created to match the content between those lines.

Ok, time to paste some text here and try it out!
Use ${modKey()}+V or ${modKey()}+V on Mac to start.`.split("\n");
