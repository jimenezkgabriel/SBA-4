1. Challenges faced during the project.
    Instead of a unorganized list as the HTML element, I decided to go for something more user friendly such as a table. I had to figure out how to append table data for each task's properties... for each task in the task list. I went the extra mile to add an if statement to append a dropdown menu for a certain table data which was the current status property.
    I then had to figure out how to update each dynamically create task's currentStatus property.
    I had to figure out how to get two filtering options to work together
    I spent way too long trying to get the Date() object to work the way I wanted to, with .localeString() to not be a day behind (thanks UTC) and setting the status to "Overdue" when the date is set in the past.
    Also had to figure out a few Bootstrap set ups so everything looks the way I wanted to.
2. How you approached solving those challenges.
    Lots of Google, MDN, and W3CSchools. Oh and Bootstrap documentation.
3. What you would improve if given more time.
    Maybe update the status of a task within the list to become overdue when the page reloads after the deadline date passes

    In GitHub Pages, might need to refresh a few times before the local storage kicks in