import { RoadmapDay } from "@/types";

export const ROADMAP_14_DAYS: RoadmapDay[] = [
  {
    id: 1,
    dayNumber: 1,
    title: "Variables, Flow & Real-World Logic",
    category: "Logic & Flow",
    durationMins: 35,
    description: "Build unconditional intuition for how computers make decisions using daily analogies like ATM cash dispensers and traffic signals.",
    status: "active",
    learnContent: {
      eli5Title: "Think of Variables as Labeled Shoe Boxes",
      eli5Body: [
        "A variable is simply a labeled storage container in the computer's memory. If you write `accountBalance = 5000`, the computer reserves a box labeled `accountBalance` and puts the number 5000 inside it.",
        "Conditional flow (`if / else`) is like a security guard at an ATM machine. The guard checks only ONE condition: 'Does the customer have enough balance?'",
        "If `balance >= requestedAmount`, dispense cash. Otherwise, display an error message and cancel."
      ],
      realWorldAnalogy: "Imagine an automated Metro Train turnstile: You scan your smart card. IF card_balance >= 30, gate swings open and 30 is deducted. ELSE red light blinks and 'Insufficient Balance' is announced. The turnstile never hesitates or guesses—it follows strict deterministic flow.",
      vernacularTip: {
        language: "Tanglish / Hinglish Intuition",
        explanation: "Konjam simple ah yosichu paarunga: Variable na oru dabba (box) maathiri. Athula unga values potu vaipom. If condition na 'Aanaal' (Agar) - if balance irundha cash varum, illana 'Buzzer' adikkum. No rocket science here!",
        colloquialMnemonic: "Dabba (Variable) + Guard (If condition) = Logic Flow."
      },
      keyRules: [
        "Variables store state; conditions check state.",
        "An `if` statement executes its block ONLY if the boolean expression is strictly true.",
        "Edge conditions matter: Always check equality (`>=` vs `>`)."
      ]
    },
    practiceProblem: {
      title: "ATM Cash Dispenser Validation",
      difficulty: "Absolute Beginner",
      scenario: "You are writing the core validation logic for an SBI ATM in Chennai. A student with `accountBalance = 1500` wants to withdraw `withdrawAmount = 2000`.",
      task: "Complete the function `canDispenseCash(accountBalance, withdrawAmount, dailyLimit)` to return true if the withdrawal is permitted, and false otherwise. Remember: Withdrawal is only permitted if the balance is sufficient AND the amount does not exceed the daily limit of 10000.",
      starterCode: `function canDispenseCash(accountBalance, withdrawAmount, dailyLimit) {
  // 1. Check if requested amount is greater than 0
  // 2. Check if requested amount is <= accountBalance
  // 3. Check if requested amount is <= dailyLimit
  
  if (withdrawAmount > 0 && withdrawAmount <= accountBalance && withdrawAmount <= dailyLimit) {
    return true;
  }
  return false;
}`,
      hints: [
        "Hint 1: Think about the 3 safety checks an ATM must make: positive withdrawal, within balance, within daily limit.",
        "Hint 2: In JavaScript or Python, combine conditions using the logical AND (`&&`) operator.",
        "Solution: `return withdrawAmount > 0 && withdrawAmount <= accountBalance && withdrawAmount <= dailyLimit;`"
      ]
    },
    checkpointPrompt: {
      question: "In an interview with TCS or Infosys, how would you explain what an edge case is in this ATM withdrawal problem, and why checking `withdrawAmount <= 0` is critical?",
      interviewerContext: "The interviewer wants to see if you think like an empathetic software engineer who protects the bank from unintended negative numbers or system glitch exploits.",
      expectedKeywords: ["negative values", "zero withdrawal", "fraud prevention", "boundary check", "edge case"]
    }
  },
  {
    id: 2,
    dayNumber: 2,
    title: "Loops Without Fear: The Repetition Engine",
    category: "Logic & Flow",
    durationMins: 40,
    description: "Demystify while and for loops as automated conveyor belts rather than confusing math symbols.",
    status: "active",
    learnContent: {
      eli5Title: "A Loop is Just a Factory Stamp Machine",
      eli5Body: [
        "When you need to stamp 'PASSED' on 50 hall tickets, you don't call 50 different people. You set a counter `i = 1`, stamp the ticket, increase `i` by 1, and repeat while `i <= 50`.",
        "Every loop in computer science has only 3 parts: Starting point (`i = 0`), Stopping boundary (`i < N`), and the Step forward (`i++`).",
        "If you forget the step forward, the stamp machine keeps stamping forever (the infamous Infinite Loop)."
      ],
      realWorldAnalogy: "Running 5 laps around the college ground: You start at lap 1. Before each lap you check: 'Have I completed 5 laps?' If no, you run the lap, increment your lap counter, and repeat. Once you hit 5, you stop and drink water.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Loop na periya vishayam illa. Xerox kadai la 10 copy poda solra maathiri. Counter 1 la start aagi, ovvoru copy varumpothum count 1 add aagum. 10 reach aana stop aagidum!",
        colloquialMnemonic: "Start -> Condition Check -> Do Work -> Increment -> Repeat."
      },
      keyRules: [
        "Always ensure your loop variable steps toward the termination condition.",
        "0-indexed counters go from `0` to `n - 1`.",
        "Avoid off-by-one errors by drawing the first and last step on paper."
      ]
    },
    practiceProblem: {
      title: "Count Odd Hall Tickets in a Roll Number Batch",
      difficulty: "Zero Gatekeeping",
      scenario: "During campus drive seating, an exam invigilator needs to know how many students between roll number `startRoll` and `endRoll` (inclusive) have odd roll numbers.",
      task: "Write a loop that counts how many numbers between `startRoll` and `endRoll` are odd (`n % 2 !== 0`).",
      starterCode: `function countOddRolls(startRoll, endRoll) {
  let count = 0;
  for (let roll = startRoll; roll <= endRoll; roll++) {
    if (roll % 2 !== 0) {
      count++;
    }
  }
  return count;
}`,
      hints: [
        "Hint 1: A number is odd when remainder after dividing by 2 is non-zero (`n % 2 !== 0`).",
        "Hint 2: Start your loop variable at `startRoll` and run while `roll <= endRoll`.",
        "Solution: Iterate from `startRoll` to `endRoll` and increment `count` if `roll % 2 !== 0`."
      ]
    },
    checkpointPrompt: {
      question: "Explain to an interviewer: What causes an infinite loop in production, and how do you safeguard against it in campus drive online coding rounds?",
      interviewerContext: "Tests basic code hygiene and defensive programming intuition.",
      expectedKeywords: ["termination condition", "counter increment", "timeout", "boundary check"]
    }
  },
  {
    id: 3,
    dayNumber: 3,
    title: "Arrays: The Classroom Bench Mental Model",
    category: "Core Tech",
    durationMins: 40,
    description: "Understand contiguous memory and array traversal by visualizing a single row of college classroom desks.",
    status: "active",
    learnContent: {
      eli5Title: "An Array is a Bench with Numbered Seats",
      eli5Body: [
        "Imagine a classroom bench with 5 chairs side by side. In programming, the first chair is labeled Seat [0], the second Seat [1], and so on.",
        "Why 0-indexed? Because the number is the 'offset' or distance from the start of the bench.",
        "Traversing an array is simply walking from Seat [0] to Seat [length - 1] and checking who is sitting there."
      ],
      realWorldAnalogy: "A medicine pill organizer box with slots for Monday through Sunday. Each compartment holds an item, and you can instantly open slot 3 to see Wednesday's tablet in O(1) time.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Array na oru single row bench. Zero la thaan seat number start aagum. Seat 0 la Rahul, Seat 1 la Priya. Namba loop potu ovvoru bench ah check panna porom!",
        colloquialMnemonic: "Array index = Distance from first element. First item is at 0 steps away."
      },
      keyRules: [
        "Arrays provide instant O(1) random access by index.",
        "Valid indices range from `0` to `array.length - 1`.",
        "Accessing index `array.length` throws `IndexOutOfBounds` in many languages."
      ]
    },
    practiceProblem: {
      title: "Find the Highest Placement Aptitude Mark",
      difficulty: "Foundation",
      scenario: "Your training officer gave you an array of test marks for 6 students: `[65, 82, 45, 99, 78, 91]`. Find the maximum score.",
      task: "Iterate through the array and track the largest value seen so far.",
      starterCode: `function findMaxScore(scores) {
  if (scores.length === 0) return 0;
  let maxScore = scores[0];
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > maxScore) {
      maxScore = scores[i];
    }
  }
  return maxScore;
}`,
      hints: [
        "Hint 1: Initialize your `maxScore` variable with the very first element `scores[0]`, not 0 (in case of negative scores).",
        "Hint 2: Start comparing from index `1` up to the last element.",
        "Solution: Compare each element with current max, updating when a larger number is found."
      ]
    },
    checkpointPrompt: {
      question: "If an interviewer asks: 'Why is accessing an array element by index O(1) instant time?', how would you explain it without complex math?",
      interviewerContext: "Tests foundational computer architecture intuition in simple English.",
      expectedKeywords: ["memory address", "contiguous", "base address + index * size", "instant jump"]
    }
  },
  {
    id: 4,
    dayNumber: 4,
    title: "Aptitude Intuition: Percentages & Ratios",
    category: "Aptitude Intuition",
    durationMins: 35,
    description: "Service company campus exams (TCS NQT, Wipro, Cognizant) test percentage intuition, not formula memorization.",
    status: "active",
    learnContent: {
      eli5Title: "Percentages are Just Slices of 100",
      eli5Body: [
        "Percent literally means 'per one hundred' (Cent = 100).",
        "10% of any number is just shifting the decimal point one place to the left (10% of 450 is 45).",
        "5% is half of 10%. 20% is double of 10%. With this trick, you can solve 80% of campus drive math in your head in 5 seconds!"
      ],
      realWorldAnalogy: "Discount shopping at Zudio or Reliance Trends: A shirt is marked ₹800 with 15% discount. 10% is ₹80, 5% is ₹40. Total discount = ₹80 + ₹40 = ₹120. You pay ₹680 without touching paper.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "10% kandupudikka kadaisi zero va thookunga. 20% venumna atha double pannunga. TCS NQT la formula theva illa, speed mental calculation thaan win pannum!",
        colloquialMnemonic: "10% = 1 decimal left. 5% = half of 10%. 1% = 2 decimals left."
      },
      keyRules: [
        "Percentage Change = (New - Old) / Old * 100.",
        "Successive discount is not additive: 20% + 20% is NOT 40% (it is 36%).",
        "Ratios: If A:B is 2:3 and total is 500, each unit is 500/5 = 100."
      ]
    },
    practiceProblem: {
      title: "Calculate College Placement Percentage",
      difficulty: "Service Essential",
      scenario: "In a department of 240 final year students, 180 received offer letters during day-1 mass drives.",
      task: "Calculate the exact placement percentage and round to 1 decimal place.",
      starterCode: `function calculatePlacementRate(totalStudents, placedStudents) {
  if (totalStudents <= 0) return 0;
  const rate = (placedStudents / totalStudents) * 100;
  return Number(rate.toFixed(1));
}`,
      hints: [
        "Hint 1: Divide placed by total: 180 / 240 = 3/4 = 0.75.",
        "Hint 2: Multiply by 100 to convert fraction to percentage: 0.75 * 100 = 75%.",
        "Solution: `return Number(((placedStudents / totalStudents) * 100).toFixed(1));`"
      ]
    },
    checkpointPrompt: {
      question: "Explain how you would mentally calculate a 15% profit on a ₹1,200 product in an aptitude interview without writing on paper.",
      interviewerContext: "Interviewers look for mental agility and clear step-by-step vocalization of thought process.",
      expectedKeywords: ["10% is 120", "5% is 60", "total 180", "1380 final selling price"]
    }
  },
  {
    id: 5,
    dayNumber: 5,
    title: "String Manipulation as Text Messaging",
    category: "Core Tech",
    durationMins: 40,
    description: "Strings are just arrays of characters. Master reversing, palindrome checks, and word counts without fear.",
    status: "active",
    learnContent: {
      eli5Title: "A String is a Word Necklace of Letter Beads",
      eli5Body: [
        "A string like 'HELLO' is a row of 5 character beads. You can inspect each letter using its index, exactly like an array.",
        "A Palindrome is a word that reads the same forwards and backwards, like 'RACECAR' or 'MADAM'.",
        "Two-pointer technique is like two friends walking towards each other from opposite ends of a corridor to meet in the middle."
      ],
      realWorldAnalogy: "Looking in a mirror: If the reflection matches the original character by character, it's symmetrical. Checking front letter against back letter until you reach the center.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Palindrome na munnadi padichalum pinnadi padichalum ore maathiri irukkum. Two-pointer na front la oru pointer, back la oru pointer vechu check panna O(n/2) la mudinjirum!",
        colloquialMnemonic: "Left moves right (++), Right moves left (--), check equality at each step."
      },
      keyRules: [
        "In many languages (Java, Python, JS), strings are immutable.",
        "Use two pointers (start and end) for palindrome and reverse operations to save memory.",
        "Case sensitivity matters: Always normalize using `.toLowerCase()`."
      ]
    },
    practiceProblem: {
      title: "Clean Palindrome Checker",
      difficulty: "Foundation",
      scenario: "Check if an input word like 'racecar' or 'Madam' is a palindrome, ignoring uppercase/lowercase differences.",
      task: "Return true if the word is a palindrome, false otherwise.",
      starterCode: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      hints: [
        "Hint 1: Convert the string to lowercase first so 'M' equals 'm'.",
        "Hint 2: Compare character at index `left` with character at `right` while `left < right`.",
        "Solution: Two-pointer comparison returning false upon first mismatch."
      ]
    },
    checkpointPrompt: {
      question: "Why is the two-pointer approach more efficient than reversing the whole string and storing it in a second variable?",
      interviewerContext: "Service and product interviewers love asking space complexity questions on string problems.",
      expectedKeywords: ["space complexity", "O(1) extra space", "no extra string allocation", "early return on mismatch"]
    }
  },
  {
    id: 6,
    dayNumber: 6,
    title: "Time & Space Complexity: Running for the Bus",
    category: "Problem Solving",
    durationMins: 45,
    description: "Understand Big-O intuitively without mathematical proofs—know the difference between O(1), O(N), and O(N^2).",
    status: "active",
    learnContent: {
      eli5Title: "Big-O is Simply: How Much Slower Does It Get as Data Grows?",
      eli5Body: [
        "O(1) - Instant: Looking at your wrist watch. It takes 1 second whether your college has 10 students or 1,000,000 students.",
        "O(N) - Linear: Calling roll numbers one by one. If 50 students, takes 50 seconds. If 500 students, takes 500 seconds.",
        "O(N^2) - Nested Loop: Every student shaking hands with every other student. For 10 students = 100 handshakes; for 1,000 students = 1,000,000 handshakes (Your code freezes!)"
      ],
      realWorldAnalogy: "Finding your friend in a crowd: If you have their exact phone number and call them, that's O(1). If you walk through the crowd person by person asking 'Are you Suresh?', that's O(N).",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "O(1) na single shot, instant! O(n) na single loop. O(n^2) na loop kullara innoru loop (nested loop). TCS Digital and Product companies la nested loop potta 'Time Limit Exceeded' (TLE) varum!",
        colloquialMnemonic: "1 Loop = O(N). 2 Nested Loops = O(N²). Binary Search = O(log N)."
      },
      keyRules: [
        "Big-O measures the growth rate as input size approaches infinity.",
        "Constants don't matter: O(2N) is simplified to O(N).",
        "Nested loops over the same size data result in O(N^2)."
      ]
    },
    practiceProblem: {
      title: "Identify Inefficient Duplicate Check",
      difficulty: "Foundation",
      scenario: "A beginner wrote two nested loops to check for duplicates in an array of size 100,000. It took 30 seconds to run.",
      task: "Optimize the duplicate check from O(N^2) to O(N) using a Set or Hash Map.",
      starterCode: `function hasDuplicates(arr) {
  // Use a Set to achieve O(N) time complexity
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      return true;
    }
    seen.add(item);
  }
  return false;
}`,
      hints: [
        "Hint 1: A Set lookup `.has(val)` is O(1) average time compared to scanning the array.",
        "Hint 2: Iterate through the array once. If item already in Set, duplicate found!",
        "Solution: Using `Set` reduces runtime from O(N^2) to O(N)."
      ]
    },
    checkpointPrompt: {
      question: "If an interviewer asks: 'Your code passed sample test cases but failed with Time Limit Exceeded (TLE) on hidden test cases', what was likely the issue and how do you fix it?",
      interviewerContext: "Crucial question for campus coding assessments (HackerRank/Mettl/AMCAT).",
      expectedKeywords: ["O(N^2) time complexity", "large input constraints", "hash set / map", "O(N) optimization"]
    }
  },
  {
    id: 7,
    dayNumber: 7,
    title: "Mid-Sprint Diagnostic & Aptitude Speed Drills",
    category: "Aptitude Intuition",
    durationMins: 45,
    description: "Time, Speed & Distance intuition with train and platform crossing problems—the favorite of TCS & Cognizant.",
    status: "active",
    learnContent: {
      eli5Title: "Relative Speed is Just Passing Other Vehicles",
      eli5Body: [
        "When two trains travel in OPPOSITE directions, they rush past each other FAST. Their speeds ADD up (`S1 + S2`).",
        "When two trains travel in the SAME direction, they crawl past each other SLOWLY. Their speeds SUBTRACT (`S1 - S2`).",
        "Crossing a pole: Distance = Length of Train. Crossing a platform: Distance = Length of Train + Length of Platform."
      ],
      realWorldAnalogy: "Riding a bike next to your friend: If you both ride at 40 km/h in the same direction, you appear stationary relative to each other (40 - 40 = 0 km/h). You can easily pass a water bottle!",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Opposite direction la vandha speed add pannanum (vegama cross aagum). Same direction la pona speed minus pannanum (slow ah cross aagum). Distance kandupudikka: Train length + Platform length.",
        colloquialMnemonic: "Opposite = Add speeds (+). Same direction = Subtract speeds (-)."
      },
      keyRules: [
        "Speed = Distance / Time.",
        "Conversion rule: km/h to m/s -> Multiply by 5/18.",
        "m/s to km/h -> Multiply by 18/5."
      ]
    },
    practiceProblem: {
      title: "Calculate Train Crossing Time",
      difficulty: "Service Essential",
      scenario: "A 200m long train travels at 72 km/h. How many seconds does it take to cross a signal post?",
      task: "Convert 72 km/h to m/s, then compute time taken in seconds.",
      starterCode: `function calculateCrossingTime(trainLengthMeters, speedKmh) {
  // Convert speed from km/h to m/s (multiply by 5/18)
  const speedMs = speedKmh * (5 / 18);
  // Time = Distance / Speed
  const timeSeconds = trainLengthMeters / speedMs;
  return Math.round(timeSeconds);
}`,
      hints: [
        "Hint 1: 72 * (5/18) = 4 * 5 = 20 m/s.",
        "Hint 2: Time = Distance (200m) / Speed (20 m/s) = 10 seconds.",
        "Solution: `return Math.round(trainLengthMeters / (speedKmh * 5 / 18));`"
      ]
    },
    checkpointPrompt: {
      question: "Walk the interviewer through: Why do we add the train length AND platform length when calculating time to cross a platform?",
      interviewerContext: "Verifies whether candidate understands physical intuition rather than blind formula recall.",
      expectedKeywords: ["front engine enters", "last coach clears", "total distance traversed", "platform length + train length"]
    }
  },
  {
    id: 8,
    dayNumber: 8,
    title: "Database & SQL: The Excel Sheet Analogy",
    category: "Core Tech",
    durationMins: 40,
    description: "Understand Relational Databases, Primary Keys, and JOINs through standard college spreadsheet tables.",
    status: "active",
    learnContent: {
      eli5Title: "SQL is Just Asking Questions to an Excel Spreadsheet",
      eli5Body: [
        "A Table is simply a sheet with rows (records) and columns (attributes).",
        "A Primary Key is your unique College Register Number—no two students can ever have the exact same one.",
        "A Foreign Key is linking your Register Number to the Hostel Room allocation sheet."
      ],
      realWorldAnalogy: "College library register: Instead of writing the student's full name, department, and phone number on every book borrowed, the librarian only writes their Register Number. They look up the details from the master student table when needed.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "SQL na periya tech illa, Excel sheet maathiri thaan. `SELECT * FROM Students WHERE marks > 80;` na 80 ku mela irukkura students list ah mattum filter panni edukradhu!",
        colloquialMnemonic: "SELECT (what columns) FROM (which table) WHERE (what condition)."
      },
      keyRules: [
        "PRIMARY KEY must be unique and non-null.",
        "INNER JOIN matches rows that have matching values in both tables.",
        "GROUP BY aggregates records into summary rows (like count by department)."
      ]
    },
    practiceProblem: {
      title: "Write Filter Query for Eligible Campus Candidates",
      difficulty: "Service Essential",
      scenario: "Find all students from department 'CSE' who have a CGPA greater than or equal to 7.5.",
      task: "Formulate the correct SQL SELECT query string.",
      starterCode: `function getEligibleCandidatesQuery() {
  return "SELECT student_id, name, cgpa FROM students WHERE department = 'CSE' AND cgpa >= 7.5 ORDER BY cgpa DESC;";
}`,
      hints: [
        "Hint 1: Use `WHERE department = 'CSE' AND cgpa >= 7.5`.",
        "Hint 2: Order results to show highest rankers first with `ORDER BY cgpa DESC`.",
        "Solution: Standard SQL SELECT with WHERE filter and ORDER BY."
      ]
    },
    checkpointPrompt: {
      question: "Explain the difference between WHERE and HAVING clauses in SQL using a simple college marks example.",
      interviewerContext: "Very frequent question in TCS, Infosys, and Cognizant technical rounds.",
      expectedKeywords: ["WHERE filters individual rows", "HAVING filters aggregated groups", "HAVING used with GROUP BY"]
    }
  },
  {
    id: 9,
    dayNumber: 9,
    title: "Object-Oriented Programming (OOP) in Real Life",
    category: "Core Tech",
    durationMins: 45,
    description: "Grasp Encapsulation, Inheritance, Polymorphism, and Abstraction through cars and mobile smartphones.",
    status: "active",
    learnContent: {
      eli5Title: "The 4 Pillars of OOP as a Smartphone",
      eli5Body: [
        "1. Abstraction: You press the camera shutter button and a photo is taken. You don't need to know how the lens sensor voltage works.",
        "2. Encapsulation: Your battery and processor are sealed inside the metal casing with a protected battery percentage reading.",
        "3. Inheritance: iPhone 16 inherits all base phone features (calls, SMS) from iPhone 15 and adds new camera features.",
        "4. Polymorphism: The 'Power Button' does different things: single tap turns screen off; double tap opens Google Pay; long press summons voice assistant."
      ],
      realWorldAnalogy: "Driving a car: Abstraction hides the engine carburetor. Encapsulation protects the fuel tank. Polymorphism means pressing the accelerator pedal works whether it's a diesel car, petrol car, or electric EV.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Abstraction = Unwanted details maraichutu, mukkiyamaana button mattum kaatradhu. Encapsulation = Oru capsule kulla medicine pack panra maathiri data + methods ah bind panradhu!",
        colloquialMnemonic: "A-P-I-E: Abstraction (Hide), Polymorphism (Many forms), Inheritance (Pass down), Encapsulation (Protect)."
      },
      keyRules: [
        "Class is the blueprint; Object is the physical instance created from it.",
        "Encapsulation uses `private` access specifiers and public getters/setters.",
        "Method Overriding (run-time) vs Method Overloading (compile-time)."
      ]
    },
    practiceProblem: {
      title: "Bank Account Class with Safe Withdrawal",
      difficulty: "Foundation",
      scenario: "Implement encapsulation by protecting `_balance` from direct modification, allowing changes only via `deposit()` and `withdraw()`.",
      task: "Complete the `BankAccount` class with balance checks.",
      starterCode: `class BankAccount {
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this._balance = initialBalance;
  }
  
  getBalance() {
    return this._balance;
  }
  
  deposit(amount) {
    if (amount > 0) this._balance += amount;
  }
  
  withdraw(amount) {
    if (amount > 0 && amount <= this._balance) {
      this._balance -= amount;
      return true;
    }
    return false;
  }
}`,
      hints: [
        "Hint 1: Keep balance private so outside code cannot do `account.balance = -99999`.",
        "Hint 2: Provide safe methods that validate balance before deducting.",
        "Solution: Encapsulated class with getters and validated mutation methods."
      ]
    },
    checkpointPrompt: {
      question: "Can you explain Polymorphism to me as if I was a 10-year-old, and then tell me how it applies in software engineering?",
      interviewerContext: "Top-tier check of genuine understanding vs textbook regurgitation.",
      expectedKeywords: ["poly = many, morph = forms", "same method name, different behavior", "method overloading and overriding", "runtime vs compile time"]
    }
  },
  {
    id: 10,
    dayNumber: 10,
    title: "Operating Systems & Memory: The Desk & Cupboard",
    category: "Core Tech",
    durationMins: 40,
    description: "RAM vs Hard Disk, Processes vs Threads, and Deadlocks simplified through study desks and shared library books.",
    status: "active",
    learnContent: {
      eli5Title: "RAM is Your Study Desk; Hard Disk is the Library Shelf",
      eli5Body: [
        "When studying for an exam, you pull 3 books from the shelf and put them on your desk (RAM).",
        "Your desk is fast to reach, but when you go to sleep (power off), the desk is cleared.",
        "The cupboard/bookshelf (SSD/Hard Drive) is slower to walk to, but your books stay safe forever."
      ],
      realWorldAnalogy: "Deadlock: Student A has the pen and needs the paper. Student B has the paper and needs the pen. Neither will share until the other gives theirs first. Both sit frozen forever until the teacher intervenes.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Process na running program (oru full application). Thread na athukkula irukkura light worker (e.g. Word file la typing oru thread, spell check innoru thread). RAM speed desk, Hard disk safe store!",
        colloquialMnemonic: "RAM = Fast & Temporary desk. SSD = Permanent shelf. Deadlock = Stalemate."
      },
      keyRules: [
        "Process has its own isolated memory; threads share the process's memory space.",
        "4 conditions for Deadlock: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
        "Paging divides memory into fixed-size blocks to avoid external fragmentation."
      ]
    },
    practiceProblem: {
      title: "Detecting Circular Resource Wait",
      difficulty: "Foundation",
      scenario: "Identify if two processes P1 and P2 are in a circular deadlock state based on resource requests and holds.",
      task: "Return true if deadlock condition is met.",
      starterCode: `function isDeadlocked(p1Holds, p1Wants, p2Holds, p2Wants) {
  // Circular wait check
  return (p1Wants === p2Holds && p2Wants === p1Holds);
}`,
      hints: [
        "Hint 1: If P1 needs what P2 holds, AND P2 needs what P1 holds, neither can proceed.",
        "Hint 2: This is the definition of Circular Wait.",
        "Solution: `return p1Wants === p2Holds && p2Wants === p1Holds;`"
      ]
    },
    checkpointPrompt: {
      question: "What is the practical difference between a Process and a Thread, and why do web browsers use separate processes for tabs?",
      interviewerContext: "Checks real-world system design awareness and fault tolerance understanding.",
      expectedKeywords: ["isolated memory", "crash prevention", "one tab crash does not kill browser", "threads share memory"]
    }
  },
  {
    id: 11,
    dayNumber: 11,
    title: "Computer Networks: The Postal Delivery Analogy",
    category: "Core Tech",
    durationMins: 40,
    description: "IP Addresses, DNS, TCP vs UDP, and HTTP/HTTPS explained as courier packages and phone calls.",
    status: "active",
    learnContent: {
      eli5Title: "DNS is Truecaller; TCP is a Registered Post Courier",
      eli5Body: [
        "You don't memorize 142.250.190.46; you type google.com. DNS is simply the Internet's Truecaller/Contacts app that converts domain names to IP addresses.",
        "TCP is Registered Post with Acknowledgment: The receiver must sign for every packet. If a packet is lost in the rain, TCP re-sends it.",
        "UDP is live radio broadcast or YouTube video stream: It sends data fast without waiting for receipt signatures. A dropped video frame is fine, but dropped bank transaction is not!"
      ],
      realWorldAnalogy: "Phone call vs SMS: A phone call requires 'Hello? Can you hear me? Yes!' (TCP 3-way handshake) before starting conversation. SMS (UDP) is fired and forgotten.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "DNS na Phonebook maathiri. IP address kandupudikkum. TCP na Delivery boy unga kitta signature vangura maathiri (guaranteed delivery). UDP na live cricket commentary maathiri (fast but packets drop aagalam).",
        colloquialMnemonic: "TCP = Reliable & Handshake. UDP = Fast & Stream. HTTP = Plain letter. HTTPS = Sealed lockbox."
      },
      keyRules: [
        "TCP 3-way handshake: SYN -> SYN-ACK -> ACK.",
        "Port numbers direct traffic to the specific application (Port 80 = HTTP, 443 = HTTPS).",
        "HTTPS encrypts the payload using TLS/SSL so Wi-Fi snoopers cannot see passwords."
      ]
    },
    practiceProblem: {
      title: "Protocol Selector for Streaming vs Payments",
      difficulty: "Foundation",
      scenario: "Determine whether TCP or UDP should be selected based on application requirements (financial transfer vs multiplayer FPS game).",
      task: "Return 'TCP' for zero-loss requirement and 'UDP' for ultra-low-latency real-time video/gaming.",
      starterCode: `function selectProtocol(useCase) {
  const reliableNeeds = ['banking', 'file_transfer', 'email', 'login'];
  if (reliableNeeds.includes(useCase.toLowerCase())) {
    return 'TCP';
  }
  return 'UDP';
}`,
      hints: [
        "Hint 1: Financial data and logins cannot afford missing packets -> TCP.",
        "Hint 2: Live voice and real-time gaming prioritize speed over retransmitting old frames -> UDP.",
        "Solution: Map reliability requirements to TCP, real-time streaming to UDP."
      ]
    },
    checkpointPrompt: {
      question: "What happens from the exact second you type 'google.com' in your browser and press Enter, until the page appears?",
      interviewerContext: "The classic legendary interview question asked across all tiers of companies.",
      expectedKeywords: ["DNS lookup", "IP address resolution", "TCP 3-way handshake", "TLS handshake (HTTPS)", "HTTP GET request", "HTML/CSS rendering"]
    }
  },
  {
    id: 12,
    dayNumber: 12,
    title: "Cracking the Self-Introduction & STAR Method",
    category: "HR & Communication",
    durationMins: 35,
    description: "Structure your 90-second 'Tell me about yourself' pitch to command respect, even with zero prior experience.",
    status: "active",
    learnContent: {
      eli5Title: "The Past-Present-Future Formula for Self-Intro",
      eli5Body: [
        "Never recite your 10th and 12th standard percentage in the first sentence. The interviewer already has your resume!",
        "1. PRESENT: 'I am currently a final year student passionate about building clean, reliable web applications...'",
        "2. PAST: 'Recently, I built a hands-on project where I solved [specific problem]...'",
        "3. FUTURE: 'I am excited about this role at [Company] because your team focuses on scalable solutions where I can contribute and accelerate my velocity.'"
      ],
      realWorldAnalogy: "A movie teaser: In 60 seconds, a movie teaser doesn't list the director's school grades; it showcases the exciting core plot and makes you want to watch the full movie.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Introduction la bio-data va read panna koodathu. 'Naan yaaru, enna project pannen, intha company la enna value create panna poren' nu 3 points crisp ah sonna interviewer impress aaiduvanga!",
        colloquialMnemonic: "Present (Who I am) -> Past (What I built) -> Future (Why I'm here)."
      },
      keyRules: [
        "Keep it strictly between 60 to 90 seconds.",
        "STAR Method for behavioral questions: Situation -> Task -> Action -> Result.",
        "Quantify your results: 'Improved loading speed by 25%' sounds 10x better than 'made it faster'."
      ]
    },
    practiceProblem: {
      title: "Assemble Your STAR Story Pitch",
      difficulty: "Foundation",
      scenario: "Structure a response to: 'Tell me about a time you faced a difficult technical bug during a college project.'",
      task: "Fill in the STAR template components with structured answers.",
      starterCode: `const myStarResponse = {
  situation: "During our final semester project, our app failed when 20 students submitted forms at once.",
  task: "I was responsible for fixing the server crash before the submission deadline.",
  action: "I analyzed logs, identified an unhandled Promise rejection, and added input debouncing.",
  result: "The platform successfully handled 100 concurrent submissions without any timeouts."
};`,
      hints: [
        "Hint 1: Situation sets the context, Task defines your personal responsibility.",
        "Hint 2: Action must focus on what YOU did (use 'I', not just 'we').",
        "Solution: Quantified, structured STAR format response."
      ]
    },
    checkpointPrompt: {
      question: "Give your 60-second elevator pitch answering: 'Tell me about yourself and why you chose engineering.'",
      interviewerContext: "Tests articulation clarity, structure, confidence, and genuine career motivation.",
      expectedKeywords: ["present role", "curiosity / problem solving", "practical project", "company alignment"]
    }
  },
  {
    id: 13,
    dayNumber: 13,
    title: "Handling Tricky HR Questions with Tact",
    category: "HR & Communication",
    durationMins: 35,
    description: "Turn 'What is your greatest weakness?' and 'Why should we hire you over others?' into winning answers.",
    status: "active",
    learnContent: {
      eli5Title: "The Weakness Question is a Self-Awareness Test",
      eli5Body: [
        "Never say 'I have no weaknesses' (arrogant) and never say 'I am a perfectionist' (cliché and fake).",
        "Instead, pick a genuine, non-fatal area of growth and showcase the active system you use to improve it.",
        "Formula: Honest minor weakness + Tool/System you adopted + Measurable progress you made."
      ],
      realWorldAnalogy: "Car dashboard warning light: An alert telling you tire pressure is at 28 PSI isn't bad—it allows you to fill air before a highway blowout. Showing self-awareness proves you can be coached.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Weakness keta shock aaga koodathu. 'Enakku public speaking la chinna hesitation irundhuchu, athunala daily 10 mins mirror munnadi practice panni ippo stage presentation panna start panniten' nu sollanum!",
        colloquialMnemonic: "Weakness + Action Taken + Improvement Shown = Green Flag."
      },
      keyRules: [
        "Never pick a core job requirement as your weakness (e.g. don't say 'I hate coding' for a software role).",
        "Show extreme willingness to learn and adapt to new technologies.",
        "Salary questions: In mass campus drives, acknowledge standard company band cheerfully."
      ]
    },
    practiceProblem: {
      title: "Refining the Weakness Response",
      difficulty: "Foundation",
      scenario: "Transform a generic answer 'I get stressed easily' into a professional, growth-oriented interview answer.",
      task: "Draft the refined response following the 3-step formula.",
      starterCode: `function getWeaknessAnswer() {
  return "Earlier, I used to struggle with multitasking during exam weeks. To solve this, I adopted the Pomodoro technique and Google Calendar time-blocking, which helped me deliver all project milestones on schedule.";
}`,
      hints: [
        "Hint 1: Acknowledge time management/multitasking rather than character flaws.",
        "Hint 2: Explicitly name the tool or habit you adopted to manage it.",
        "Solution: Honest weakness paired with a proactive productivity habit."
      ]
    },
    checkpointPrompt: {
      question: "How would you respond if an interviewer asks: 'Where do you see yourself in 3 to 5 years?' in a campus drive?",
      interviewerContext: "Interviewers check company retention, career ambition, and realistic expectations.",
      expectedKeywords: ["technical depth", "mentoring juniors", "taking ownership of features", "valuable contributor"]
    }
  },
  {
    id: 14,
    dayNumber: 14,
    title: "Grand Mock Drive: Zero-to-One Simulation",
    category: "Problem Solving",
    durationMins: 45,
    description: "Integrate aptitude, foundational coding, and interview articulation in a simulated final placement sprint.",
    status: "active",
    learnContent: {
      eli5Title: "The Final Mile: Composure Beats Perfection",
      eli5Body: [
        "In campus drives, interviewers don't expect you to write Google-level compilers. They evaluate:",
        "1. Trainability: When given a hint, do you listen or argue?",
        "2. Articulation: Can you explain your thought process out loud while thinking?",
        "3. Attitude: Do you remain calm when you don't know an answer immediately?"
      ],
      realWorldAnalogy: "A driving test: You don't need to drift like Formula 1; you just need to check your mirrors, use indicators, and follow lane rules calmly.",
      vernacularTip: {
        language: "Tanglish Intuition",
        explanation: "Kadaisi round la thideer nu theriyadha question kettalum bayappadadheenga. 'Sir, enakku exact ah therila, aana en intuition ithu thaan' nu calm ah try panna kooda selection chance 80% increase aagum!",
        colloquialMnemonic: "Think Aloud + Accept Hints + Stay Smiling = Offer Letter."
      },
      keyRules: [
        "Always repeat the question to confirm understanding before answering.",
        "State your brute-force approach first, then mention how you can optimize it.",
        "Thank the interviewer genuinely at the end and ask one smart question about team culture."
      ]
    },
    practiceProblem: {
      title: "Comprehensive Logic: Two Sum Intuition",
      difficulty: "Foundation",
      scenario: "Given an array of aptitude scores and a target mark, return indices of the two students whose scores sum to the target.",
      task: "Implement the two sum solution using a Map for O(N) lookup.",
      starterCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      hints: [
        "Hint 1: Instead of checking every pair with nested loops, ask: 'What number do I need to reach target?'",
        "Hint 2: Store previous numbers and their indices in a Map.",
        "Solution: Single-pass Hash Map solution in O(N) time."
      ]
    },
    checkpointPrompt: {
      question: "Defend your approach to the Two Sum problem: Walk me through the trade-off between the O(N^2) brute force and the O(N) Hash Map solution.",
      interviewerContext: "The capstone interview defense question asked in 90% of technical rounds.",
      expectedKeywords: ["time vs space tradeoff", "O(N^2) brute force nested loops", "O(N) time with Map", "O(N) auxiliary space"]
    }
  }
];

export const ROADMAP_30_DAYS_SUMMARY = [
  { day: "Days 1-7", title: "Zero-to-One Foundations", focus: "Variables, Flow, Mental Aptitude & Memory Basics" },
  { day: "Days 8-14", title: "Core CS & Service Company Mastery", focus: "SQL, OOP, OS Basics, Networking & STAR HR" },
  { day: "Days 15-21", title: "Intermediate Data Structures", focus: "Linked Lists, Stacks, Queues, Binary Trees & Recursion Intuition" },
  { day: "Days 22-26", title: "Search, Sort & Dynamic Mindset", focus: "Binary Search, Two-Pointers, Sliding Window, Greedy Logic" },
  { day: "Days 27-30", title: "Product Tier-1 & Startup Readiness", focus: "System Design ELI5, Full Mock Interviews & Clean Code" }
];

export interface DsaTrackModule {
  id: number;
  stage: string;
  title: string;
  description: string;
  mentalModel: string;
  visualAnalogy: string;
  keyProblems: string[];
  dayShortcutId: number;
  complexity: string;
}

export const TARGETED_DSA_ROADMAP: DsaTrackModule[] = [
  {
    id: 1,
    stage: "Stage 1",
    title: "Visual Arrays & Contiguous Memory",
    description: "Master numbered classroom benches, instant O(1) index lookups, and boundary traversals without off-by-one errors.",
    mentalModel: "Contiguous numbered seats in a college bus.",
    visualAnalogy: "Opening seat #4 directly without scanning seats 0, 1, 2, 3.",
    keyProblems: ["Max Placement Mark (Day 3)", "In-Place Array Reversal", "Remove Duplicates"],
    dayShortcutId: 3,
    complexity: "O(1) Access • O(N) Traversal"
  },
  {
    id: 2,
    stage: "Stage 2",
    title: "Two-Pointer Technique (Meeting in the Middle)",
    description: "Two friends walking toward each other from opposite ends of a corridor to solve palindromes and pairs in linear time.",
    mentalModel: "Left pointer moves right (++), Right pointer moves left (--).",
    visualAnalogy: "Tuning radio frequency dials from both directions.",
    keyProblems: ["Valid Palindrome (Day 5)", "Two Sum II (Sorted Array)", "Container With Most Water"],
    dayShortcutId: 5,
    complexity: "O(N) Time • O(1) Space"
  },
  {
    id: 3,
    stage: "Stage 3",
    title: "Hashing & Key-Value Lookups (The Coat Check Room)",
    description: "Trading auxiliary memory for speed: Replace slow O(N^2) double loops with instant O(1) hash map checks.",
    mentalModel: "Coat check token: Hand in token #42, receive your jacket immediately.",
    visualAnalogy: "College attendance register index table.",
    keyProblems: ["Two Sum Hash Map (Day 14)", "First Non-Repeating Character", "Contains Duplicate (Day 6)"],
    dayShortcutId: 14,
    complexity: "O(N) Time • O(N) Space Trade-off"
  },
  {
    id: 4,
    stage: "Stage 4",
    title: "Stacks & Queues (Cafeteria Trays vs Metro Lines)",
    description: "LIFO (Last-In-First-Out) cafeteria plates vs FIFO (First-In-First-Out) movie ticket line.",
    mentalModel: "Stack = Plate pile (Undo stack). Queue = Hospital token counter.",
    visualAnalogy: "Browser Back Button (Stack) vs Print Job Queue.",
    keyProblems: ["Valid Parentheses ({[]})", "Daily Temperatures", "Implement Queue using Stacks"],
    dayShortcutId: 6,
    complexity: "O(1) Push/Pop"
  },
  {
    id: 5,
    stage: "Stage 5",
    title: "Binary Trees & Hierarchical Traversal Without Fear",
    description: "Understand family genealogy trees and organizational charts without recursive panic.",
    mentalModel: "Company CEO -> Vice Presidents -> Team Leads -> Developers.",
    visualAnalogy: "Branching road forks in a delivery route.",
    keyProblems: ["Maximum Depth of Tree", "Invert Binary Tree", "Level Order Traversal"],
    dayShortcutId: 10,
    complexity: "O(N) Traversal • O(log N) Balanced Search"
  }
];
