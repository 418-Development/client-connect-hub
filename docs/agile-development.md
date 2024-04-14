# Agile Development

[Back](../README.md)

## Epic

An Epic is a large body of work that can be broken down into smaller user stories. It usually involves a considerable amount of work and can take several sprints.

## User Story

A User Story is a small, self-contained piece of work that delivers value to the end-user. They should help teams understand the requirements from the perspective of an end-user. It should follow a specific format:

`As a <role>, I want <action>, (so that <benefit>)`.

For example:

_As a customer, I want to be able to add items to my shopping cart, so that I can purchase them later._

Additionally, user stories often include `Acceptance Criteria`, which define the conditions that must be met for the story to be considered complete. Acceptance criteria typically outline specific behaviors, functionalities, or conditions that the software must satisfy. For example:

-   _The user should be able to add items to the shopping cart by clicking the "Add to Cart" button._
-   _The shopping cart should display the total price of all items added._
-   _The user should be able to remove items from the shopping cart._
-   _The shopping cart should update dynamically without requiring a page refresh._

The description of a user story should look like this:

```
## User Story
As a user, I want to be able to navigate between multiple pages so that I can access different sections of the application seamlessly.

## Acceptance Criteria
- todo
- todo
- todo

## Tasks
- [x] #9
- [x] #8
- [ ] #10
- [ ] #11
```

User stories should be assigned `Story Points` to estimate their complexity or effort required for implementation. Story points are relative measures used for planning and tracking progress. The specific values used for story points can vary depending on the team's preference but are often the Fibonacci sequence.
We will use a modified version:

`1, 2, 3, 5, 8, 13, 20, 40, or 100`

Lastly, user stories are often prioritized to indicate their relative importance or urgency. Prioritization helps the team focus on delivering the highest value items first and ensures that resources are allocated effectively to meet project goals.

User stories are also often `prioritized` according to their relative importance or urgency.

## Task

Tasks are individual units of work that need to be completed to fulfill a user story. Tasks are usually small and can be accomplished within a short period. We will track them on our task board within this project.

To crate a new task you

1. Add a item to the Todo column on the task board.
2. Convert the item to an issue for the `client-connect-hub` repository.
3. Each task should reference the user story it belongs to by including the issue number. (in the description of the task) For example:

```
User Story: #42
```

4. You should also give it the `Frontend` or `Backend` label.
5. Add the issue number to the Tasks section of the User Story e.g.:

```
## Tasks
- [x] #9
- [x] #8
- [ ] #10
- [ ] #11
```

## Sprint Planning

Sprint Planning is a meeting at the beginning of each sprint where the team plans the work to be done during the sprint. Here we select user stories to work on, breaking them down into tasks, estimating effort, and committing to the sprint goal.

## Daily Scrum / Standup

The Daily Scrum, also known as the Daily Standup, is a short daily meeting where the team synchronizes activities and plans for the day. Each team member answers three questions: What did I do yesterday? What will I do today? Are there any blockers or impediments?

## Sprint Review

The Sprint Review is a meeting at the end of each sprint where the team presents the completed increment to stakeholders and gathers feedback. It provides an opportunity for stakeholders to inspect the product and make adjustments to the backlog based on the feedback received.

## Sprint Retrospective

The Sprint Retrospective is a meeting held at the end of each sprint where the team reflects on their processes and identifies ways to improve. It's an opportunity to discuss what went well, what could be improved, and what actions can be taken to make the next sprint more successful.
