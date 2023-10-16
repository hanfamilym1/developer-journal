# Learning Entry - 2023-10-16

## Type of Learning: Snippet

### What I've Learned:

I got this from stackoverflow [link](https://stackoverflow.com/questions/65271151/how-do-i-fix-my-button-not-working-in-html)

I changed qtwo function to meet my needs:
- return an array

```
 function qtwo() {
    var text = "";
    var numyrs = prompt("How many years do you want to go back in time?");
    console.log(numyrs);
    switch (numyrs) {
      case "2019":
        text = "Scientists release first-ever image of black hole."
        break;
      case "2018":
        text = "The United States Leaves the Iran Nuclear Deal."
        break;
      default:
        text = "";
        break;
    }
    

    // changed
    function qtwo() {
      return []
    }
```

[Write here what you've learned during your study, experiment, or exploration. Be as detailed and informative as possible.]
