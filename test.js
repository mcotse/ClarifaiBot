var result = { docId: 2462713203533080600,
  docIdStr: '2e472ba2b38aa63f222d509c5040e7d5',
  tags:
   [ { class: 'no person',
       conceptId: 'ai_786Zr311',
       probability: 0.9946880340576172 },
     { class: 'cream',
       conceptId: 'ai_qNxqNBWN',
       probability: 0.990070104598999 },
      ] }

for (let {tags:[{ class: id }]} = result
// let [o1] = tags

// console.log(tags)
// console.log(o1)
console.log(id)

for (var {name: n, family: { father: f } } of people) {
  console.log("Name: " + n + ", Father: " + f);
}
