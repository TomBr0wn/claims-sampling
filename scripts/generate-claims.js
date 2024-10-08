const fs = require('fs')

const path = require('path')

const faker = require('@faker-js/faker').faker



const generateClaim = () => {
  let claim = {}
  

  //Claim ID
  claim.id = "" + faker.number.int({ min: 123456, max: 999999 })


  //Stautuses
  claim.status = faker.helpers.arrayElement([
    'Submitted',
    'Request information',
    'Pending ESFA check',
    'Sent to ESFA',
    'Paid',
    'Payment not approved',
    'Sampling in progress',
    'Sampled and paid',
    'Clawback required',
    'Clawback review',
    'Claim updated',
    'Clawback pending',
    'Clawback complete',
    'Draft'
  ])

  //Providers
  claim.provider = faker.helpers.arrayElement([
    'Best Practice Network',
    'NIoT: National Institute of Teaching, founded by the School-Led Development Trust'
  ])

   //Academic year
   claim.academicYear = faker.helpers.arrayElement([
    '2023 to 2024',
    '2024 to 2025'
  ])
  
  //claim uuid
  claim.uuid = faker.string.uuid()

  //School name
  claim.orgName = faker.company.buzzAdjective() + " school"

  //claim Ref number
  claim.claimRef = "" + faker.number.int({ min: 123456, max: 999999 })

  //days since sent to provider
  claim.daysSinceClaim = "" + faker.number.int({ min: 30, max: 250 }) + " days ago"
  
  //claim Ref number append to school name
  claim.claimRefandNum = claim.claimRef + " - " + claim.orgName

  //UK provider reference number (UKPRN)
  claim.ukprn = faker.string.numeric(8)

  //Unique reference number (URN)
  claim.urn = faker.string.numeric(6)

  //Agreed by
  claim.firstName = faker.person.firstName()
  claim.lastName = faker.person.lastName()
  ////////////////////////
  // MENTOR
  ///////////////////////////
  claim.mentor = faker.person.firstName() + " " + faker.person.lastName()
  //hours of training
  claim.hoursOfTraining = "" + faker.number.int({ min: 1, max: 20 })

  //Claim Amount
  claim.amount = "" +  (43.80 * claim.hoursOfTraining)

  //claim submitted by
  claim.submittedBy = faker.person.firstName() + " " + faker.person.lastName()
  
  

  //DAte
  claim.date = faker.date.recent({ days: 300 })

  //Region
  claim.region = faker.location.county()

  

  //Hourly rate £43.80
  claim.hourlyRate = "£43.80"

  //Email
  claim.orgEmailAddress = `${claim.firstName.toLowerCase()}.${claim.lastName.toLowerCase()}@${claim.orgName.toLowerCase()}.uk`

  //Tel
  // claim.orgPhone = faker.phone.number()
  claim.orgPhone = "" + "0" + faker.number.int({ min: 7000, max: 7999  }) + " " + faker.number.int({ min: 100000, max: 999999 })

  //Website
  claim.orgWebsite = faker.internet.domainName()
  
  
  //Address
  claim.orgAddress = {
    line1: faker.location.buildingNumber() + " " + faker.location.street(),
    town: faker.location.city(),
    postcode: 'W9 1ST'
  }

  return claim
}

   
const generateClaims = () => {
  const claims = []
  
    for(let i = 0; i < 60; i++) {
        claims.push(generateClaim())
    }

    return claims
}



  const generateClaimsFile = (filePath) => {
    const claims = generateClaims()
    const filedata = JSON.stringify(claims, null, 2)
    fs.writeFile(
      filePath,
      filedata,
      (error) => {
        if (error) {
          console.error(error)
        }
        console.log(`Claims generated: ${filePath}`)
      }
    )
  }
  
  generateClaimsFile(path.join(__dirname, '../app/data/claims.json'))


  