<div align="center">
<h1>ANON Validator</h1>
<p>
ANON Validator is a tool that can read your .anon files and validate them for errors. It has the capability to print the line number and position of the error to help the user easily fix them. In certain cases, it also displays a suggestion that can most probably fix the error. Since ANON can be considered a superset of JSON with additional functionalities, the tool parses the file character by character following a particular pattern like JSON (with additional features supported in ANON) to determine the correctness of the syntax.
</p>
</div>
  
# Steps to run
1. Clone this repository.
2. In the root of the project, run `npm i` to install the dependencies.
3. In the root of the project, run `node index <path_to_file>/file_name.anon` (Eg: `node index test.anon`).

# Test execution
After cloning the repository and installing the dependencies, run `npm test` to execute the unit tests.

# Screenshots
**1) No erros during validation**

<img src="./screenshots/no-error.jpg" align="center">

**2) Error example 1**

<img src="./screenshots/unexpected-char.jpg" align="center">

**3) Error example 2**

<img src="./screenshots/missing-char.jpg" align="center">

**4) No content in file**

<img src="./screenshots/no-content.jpg" align="center">

**5) No file provided error**

<img src="./screenshots/no-file-arg.jpg" align="center">

**6) Wrong file path/name error**

<img src="./screenshots/wrong-path.jpg" align="center">

**7) Wrong file format error**

<img src="./screenshots/wrong-format.jpg" align="center">

**8) Test execution**

<img src="./screenshots/test-output.jpg" align="center">
