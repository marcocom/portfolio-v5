var Faker = require('faker');

function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const s3bucketURL = 'http://experiencemore-frontend-assets.s3-website-us-west-2.amazonaws.com';

function createFrame(number) {
  return {
    frameId: Faker.random.uuid(),
    frameNumber: number,
    submissions: [],
    images: {
      'w1920': `${s3bucketURL}/brady-frame-${number}-w1920.jpg`,
      'w960': `${s3bucketURL}/brady-frame-${number}-w960.jpg`,
      'w480': `${s3bucketURL}/brady-frame-${number}-w480.jpg`,
      'w320': `${s3bucketURL}/brady-frame-${number}-w320.jpg`,
      'w240': `${s3bucketURL}/brady-frame-${number}-w240.jpg`,
      'w160': `${s3bucketURL}/brady-frame-${number}-w160.jpg`
    }
  }
}

function createSubmission({
  frameNumber,
  frameId,
  userId,
  author,
  location,
}) {
  const statusOptions = ['INTEL_APPROVAL', 'BRADY_APPROVAL', 'APPROVED', 'REJECTED'];
  const categoryOptions = ['FAVORITES', 'FUNNIEST', 'ARTWORKS', 'WEIRD'];
  return {
    submissionId: Faker.random.uuid(),
    status: statusOptions[getRandomIntInRange(0, statusOptions.length - 1)],
    category: categoryOptions[getRandomIntInRange(0, categoryOptions.length - 1)],
    frameNumber,
    frameId,
    userId,
    author,
    location,
    images: {
      'w1920': `${s3bucketURL}/brady-submission-${frameNumber}-w1920.jpg`,
      'w960': `${s3bucketURL}/brady-submission-${frameNumber}-w960.jpg`,
      'w480': `${s3bucketURL}/brady-submission-${frameNumber}-w480.jpg`,
      'w320': `${s3bucketURL}/brady-submission-${frameNumber}-w320.jpg`,
      'w240': `${s3bucketURL}/brady-submission-${frameNumber}-w240.jpg`,
      'w160': `${s3bucketURL}/brady-submission-${frameNumber}-w160.jpg`
    }
  };
}

function createUser() {
  const adminOptions = ['USER', 'INTEL_APPROVER', 'BRADY_APPROVER'];
  return {
    userId: Faker.random.uuid(),
    status: adminOptions[getRandomIntInRange(0, adminOptions.length - 1)],
    receivesEmail: true,
    location: Faker.address.city(),
    email: Faker.internet.email(),
    first_name: Faker.name.firstName(),
    last_name: Faker.name.lastName(),
    picture: Faker.image.avatar(),
    downloads: [],
    submissions: [],
  };
}

function createNavFrame(i){
  return `${s3bucketURL}/brady-frame-${i}-w160.jpg`;
}

const appData = {
  frame: [],
  submissions: [],
  users: [],
  navframes: [],
};

// createFrames
for (let number = 1; number <= 98; number++) {
  appData.frame.push(createFrame(number));
  appData.navframes.push(createNavFrame(number));
}

// example users
for (let index = 0; index < 11; index++) {
  appData.users.push(createUser());
}

// picker frames
appData.picker = [1, 2, 3].map(() => {
  const frameNumber = getRandomIntInRange(0, appData.frame.length - 1);
  return appData.frame[frameNumber];
});

// example submission for each frame
for (let i = 0; i < 4; i++) {
  appData.frame.forEach(frame => {
    const user = appData.users[getRandomIntInRange(0, appData.users.length - 1)];
    const submission = createSubmission({
      frameNumber: frame.frameNumber,
      frameId: frame.id,
      userId: user.userId,
      author: `${user.first_name} ${user.last_name}`,
      location: user.city,
    });
    user.submissions.push(submission);
    frame.submissions.push(submission);
    appData.submissions.push(submission);
  });
}

module.exports = () => appData;
