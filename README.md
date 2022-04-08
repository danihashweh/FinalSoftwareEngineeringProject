**SYSC 4806 Course Project**

Application: Mini-survey monkey

Back-end: Java Spring

**Milestone 1:**

Contributors: Dani Hashweh, Abdalla El Nakla, Krishan Easparan, Isaac Leung 

Notion meeting notes: https://www.notion.so/8d8b2bef2b9b4f6580463c6ea37e6fe1?v=d824c29715624257a5d3a539615d6841

UML Class diagram for project: 
![image](https://user-images.githubusercontent.com/33381955/160062446-a2341f9d-abd1-42cd-a0ba-67b97061b478.png)

For milestone 1, the general functionality was completed and the application is operational. A user can participate in a survey that contains only text answers, and once submitted the information will be sent to the database. An admin will be able to close the survey - and once closed, can view the results of the survey. This project is integrated with CircleCI, where the build and test results can be viewed. Heroku was used to deploy this application. All tasks were kept track of using a kanban board - and daily scrum meetings were held to ensure that progress is being tracked. 

**Milestone 2:**

Notion meeting notes: https://www.notion.so/8d8b2bef2b9b4f6580463c6ea37e6fe1?v=d824c29715624257a5d3a539615d6841&p=e80f49a7afee406da187d73ee3426b5e

UML Class diagram (Milestone 2 Updated)
![image](https://user-images.githubusercontent.com/28928010/160149157-b2415753-8d2a-47fa-9cf9-7862107349c0.png)

Front-End: React

Back-end: Java Spring

For this milestone, we moved our front-end to a framework known as react. Since this milestone was lengthy in terms of work to move over from our original
thymeleaf/html framework, not as many new features were added. We added an authentication page using spring security, which allows access to certain pages 
depending on the type of user logged in. For this feature, we kept a master admin user/password and a test user user/password which can be found in the security config. We also added different types of questions so that the survey is not limited to just text areas. Building from the previous milestone, our project is still being integrated with CircleCI and Heroku is being used to deploy the application. Our progress is being tracked the same way as our previous milestone.

**Milestone 3:**

Notion meeting notes: https://www.notion.so/Meeting-notes-4-6-2022-6abf455467904c1ca5d751c18388087b

For the final milestone we want to achieve a polished version of a survey monkey form.

Features to be added:
- Ability to add more than one survey
- Give the ability to create users 


