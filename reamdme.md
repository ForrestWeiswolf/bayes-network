An in-browser tool to display and edit graphs, designed to be used to create Bayesian networks that automatically update existing nodes when new ones are added. 
Made in four days for Fullstack Academy's stackathon; not fully functional on account of they time constraints, though I may come back to it at some point.
Graph editing essentially works. Nodes automatically update in breadth-first order with a provided function, though the latest commit may have introduced a bug where the page sometimes refreshes before this can happen. The BayesUpdate function, however, has some serious errors; I may need to brush up on statistics before fixing that up.