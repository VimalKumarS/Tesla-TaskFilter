ReadMe

Technology used
- Express JS - to create web api
- HTMl, CSS, Javascript , Bootstrap
- Node.js to host the web api

Created API 

Source file - app.js
Dummy data source - DataSource\CodeDescription.js

1) Expose codes http://localhost:5555/teslamotors/codes
   return xml with all codes
2) Expose codes_ dependencies - http://localhost:5555/teslamotors/code_depedencies/13236
   return xml for code related to 13236
3) Expose codes_hirerchy - http://localhost:5555/teslamotors/listAllDependency/14456
	return JSON with complete hierarchy of codes related to 14456
	


HTMl view

1) ListOfCode.html
	- make a rest api call to service(3)
	
Steps to execute
1) You should have node installed.
2) go to folder where you have unzipped the project
3) npm install
4) node app.js  
5) this will run the server on port 5555
6) open and run the html file

Functionality 
1) Technician search for code eg 14456
2) This will list all the sub task to be performed
3) Check for completion of child task before parent task to be mark as complete.



![alt tag](https://github.com/VimalKumarS/MemoryGame/blob/master/Capture1.PNG)
