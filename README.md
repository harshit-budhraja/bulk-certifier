# bulk-certifier

A bulk certificate generator written in Node. The idea is to use a PDF template and an excel spreadsheet of participants, winners etc. from `assets/` to bulk export certificates to an `assets/output` folder.

## Inspiration

The inspiration of working on this idea came in while organising [HackNU 2.0](https://github.com/hacknu2-0) for students of NIIT University from **27th May - 3rd June, 2020**.

## Building locally

To build this project locally, you should have the following dependencies installed:

* Node.js (Built and tested on `v10.16.3`; recommended)
* npm (`6.14.4`)

#### Steps to setup the environment

1. Clone this repository on your machine: `git clone https://github.com/harshit-budhraja/bulk-certifier.git && cd bulk-certifier`

2. Install package dependencies: `npm install`

3. Create an assets folder: `mkdir assets`.

4. Copy your PDF template file in this folder under the name `template.pdf`

5. Also create an output folder inside assets: `mkdir assets/output`. This is where the output files will be written.

6. Finally, run the app: `node src/app.js`
