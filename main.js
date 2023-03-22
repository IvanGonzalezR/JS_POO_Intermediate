
function isObject(subject) {
  return (typeof subject == 'object');
}
function isArray(subject) {
  return (Array.isArray(subject));
}

function deepCopy(subject) {
  let copySubject;

  const subjectIsArray = isArray(subject);
  const subjectIsObject = isObject(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[ key ]);

    if (keyIsObject) {
      copySubject[ key ] = deepCopy(subject[ key ]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[ key ])
      } else { //si no es array
        copySubject[ key ] = subject[ key ];
      }
    }
  }

  return copySubject;
}

// function isObject(subject) {
//   return (typeof subject == 'object');
// }
function SuperObject() { }
SuperObject.isObject = function (subject) {
  return (typeof subject == 'object');
}
SuperObject.deepCopy = function (subject) {
  let copySubject;

  const subjectIsArray = isArray(subject);
  const subjectIsObject = isObject(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (key in subject) {
    const keyIsObject = isObject(subject[ key ]);

    if (keyIsObject) {
      copySubject[ key ] = deepCopy(subject[ key ]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[ key ])
      } else { //si no es array
        copySubject[ key ] = subject[ key ];
      }
    }
  }

  return copySubject;
}

function requireParams(param) {
  throw new Error(`${param} es obligatorio`);
}

function LearningPath({
  name = requireParams('name'),
  courses = [],
}) {
  this.name = name;
  this.courses = courses;
};

function Student({
  name = requireParams('name'),
  email = requireParams('email'),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses,
  learningPaths = [],
} = {}) {

  this.name = name;
  this.email = email;
  this.age = age;
  this.approvedCourses = approvedCourses;
  this.socialMedia = {
    twitter,
    facebook,
    instagram,
  };

  const private = {
    _learningPaths: [],
  }

  Object.defineProperty(this, 'learningPaths', {
    get() {
      return private._learningPaths;
    },
    set(newLearningPath) {
      if (newLearningPath instanceof (LearningPath)) {
        private._learningPaths.push(newLearningPath);
      } else {
        console.warn('Learning Path no es instancia del proto de LearningPath');
      }
    },
  });

  for (learningPath of learningPaths) {
    this.learningPaths = learningPath;
  }
  // };
};

const escuelaWeb = new LearningPath({ name: 'Escuela de Web' });
const escuelaDev = new LearningPath({ name: 'Escuela de Dev' });
const juan = new Student({
  name: 'Juanito',
  email: 'ivan@gmail.com',
  twitter: 'juandc',
  learningPaths: [
    escuelaWeb,
    escuelaDev,
    // {
    //   name: 'Escuela impostora',
    //   courses: []
    // }
  ]
});
