# bulk-certifier

A bulk certificate generator written in Node. The idea is to use a set of PDF templates (for different types of certificates eg: participation, winner etc.) and a CSV file to bulk export certificates.

## Inspiration

The inspiration of working on this idea came in while organising [HackNU 2.0](https://github.com/hacknu2-0) for students of NIIT University from **27th May - 3rd June, 2020**.

## Building locally

To build this project locally, you should have the following dependencies installed:

* Node.js (Built and tested on `v10.16.3`; recommended)
* npm (`6.14.4`)

##### Steps to setup the dev environment

1. Clone this repository on your machine: `git clone https://github.com/harshit-budhraja/bulk-certifier.git && cd bulk-certifier`

2. Install package dependencies: `npm install`

3. Set your `NODE_ENV`: `export NODE_ENV=dev`

4. Finally, run the app: `node src/app.js`


##### Steps for production execution

1. Create a folder `production` inside the `assets` folder and copy the necessary files in it. By default, this folder is added to `.gitignore` so it won't be committed to git.

2. List of files required:
2.1 Font files at `production/fonts/`
2.2 Template files at `production/templates/<CERT_TYPE>.pdf`
2.3 Input CSV file at `production/all.csv`. (You can find a sample at `dev/all.csv`)

3. Set your `NODE_ENV`: `export NODE_ENV=production`

4. Run the app: `node src/app.js`