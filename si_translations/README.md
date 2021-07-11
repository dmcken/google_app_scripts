


How to add to your sheet:

1. In your google sheet go to Tools -> "Script Editor"
1. You should have an editor for Code.gs, copy the code from this Code.js into it (if there is existing code append to the bottom).

Functions exposed:
* SI_TO_RAW - Takes a SI number string like 5.43M and converts it to the actual 5430000 allowing a user to input the condensed form but you to be able to get the full value for calculations.
* RAW_TO_SI - Takes a number (usually large) and converts it to a SI based representation which would be easier for a user to read.

Notes:
* SI units are case sensitive (m - milli or 1/1000 vs M - Mega or 1,000,000).
* Currently only works with the positive SI units (TODO: support the units sub 1, right now all I need is the positive units and I'm lazy).
