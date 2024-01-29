// xzen769@gmail.com
// https://docs.google.com/presentation/d/1hWWIw4PcpPtrVpsd9lvtwSrpoTRCbFdfXu8L6JYsbWA/edit#slide=id.g21e0ed6db56_0_0
const InfectionStatus = {
  HEALTHY: "healthy",
  INFECTED: "infected"
};

const InfectionVariant = {
  ZOMBIE_A: "zombieA",
  ZOMBIE_B: "zombieB",
  ZOMBIE_32: "zombie32",
  ZOMBIE_C: "zombieC",
  ZOMBIE_ULTIME: "zombieUltime"
};
  

class Person {
  constructor(name, age, infectionStatus = InfectionStatus.HEALTHY, infectionType = null) {
    this.name = name;
    this.age = age;
    this.infectionStatus = infectionStatus;
    this.infectionType = infectionType;
    this.isAlive = true;
    this.cercleSocialDescendant = [];
    this.cercleSocialAscendant = []
    this.vaccinsImunisedVaraint = []
  }

  addRelationDescendente(person) {
   this.cercleSocialDescendant.push(person);
   person.cercleSocialAscendant.push(this)
  }

  infectionZombie32() {
    if (this.isAlive && this.infectionStatus === InfectionStatus.HEALTHY) {
      this.infectionStatus = InfectionStatus.INFECTED;
      this.infectionType = InfectionVariant.ZOMBIE_32
      for (const person of this.cercleSocialDescendant) {
        if (person.infectionStatus === InfectionStatus.HEALTHY && person.age >= 32) {
          person.infectionZombie32();
        }
      }

      for (const person of this.cercleSocialAscendant) {
        if (person.infectionStatus === InfectionStatus.HEALTHY && person.age >= 32) {
          person.infectionZombie32();
        }
      }
    }
  }

  infectionZombieA(){
    if (this.isAlive && this.infectionStatus === InfectionStatus.HEALTHY) {
      this.infectionStatus = InfectionStatus.INFECTED;
      this.infectionType = InfectionVariant.ZOMBIE_A
      for (const person of this.cercleSocialDescendant) {
        person.infectionZombieA();
      }
    }
  }

  infectionZombieB(){
    if (this.isAlive && this.infectionStatus === InfectionStatus.HEALTHY) {
      this.infectionStatus = InfectionStatus.INFECTED;
      this.infectionType = InfectionVariant.ZOMBIE_B;
      for (const person of this.cercleSocialAscendant) {
        person.infectionZombieB();
      }
    }
  }

  infectionZombieC(){
    if (this.isAlive && this.infectionStatus === InfectionStatus.HEALTHY) {
      this.infectionStatus = InfectionStatus.INFECTED;
      this.infectionType = InfectionVariant.ZOMBIE_C;
      const relationCercle = this.cercleSocialDescendant.concat(this.cercleSocialAscendant);
      for (let i = 0; i < relationCercle.length; i++) {
        if(i % 2 == 0 ){
          if (relationCercle[i].infectionStatus === InfectionStatus.HEALTHY) {
            relationCercle[i].infectionStatus = InfectionStatus.INFECTED;
            relationCercle[i].infectionType = this.infectionType;
          }
        }
        
      }
    }
  }
  
  sprendInfectionZombieUltime(){
    if(this.isAlive){
      if (this.cercleSocialAscendant.length) {
        for (const person of this.cercleSocialAscendant) {
          person.sprendInfectionZombieUltime()
        }
      }else{
        this.infectionStatus = InfectionStatus.INFECTED;
        this.infectionType = InfectionVariant.ZOMBIE_ULTIME;
      }
    }
  }

  isImuneTo(infectionZombie){
    return this.vaccinsImunisedVaraint.includes(infectionZombie);
  }

  stringListImune(){
    return this.vaccinsImunisedVaraint.length ? this.vaccinsImunisedVaraint.toString(): "Aucune immunité";
  }
  vaccinateForZombieAand32(){
    if(!this.isImuneTo(InfectionVariant.ZOMBIE_A)){
      if(this.infectionStatus == InfectionStatus.INFECTED && (this.infectionType == InfectionVariant.ZOMBIE_A
         ||  this.infectionType == InfectionVariant.ZOMBIE_32) && this.age <= 30){
          this.infectionType = null;
          this.infectionStatus = InfectionStatus.HEALTHY;
      }
      if(this.infectionStatus == InfectionStatus.HEALTHY && this.age <= 30){
        this.vaccinsImunisedVaraint.push(InfectionVariant.ZOMBIE_A);
        this.vaccinsImunisedVaraint.push(InfectionVariant.ZOMBIE_32);
      }
    }
  }

  vaccinateForZombieBandC(index){
    if(index % 2 != 0){
      this.isAlive = false;
    }else if(this.infectionType == InfectionVariant.ZOMBIE_B ||  this.infectionType == InfectionVariant.ZOMBIE_C){
      this.infectionType = null;
      this.infectionStatus = InfectionStatus.HEALTHY;
    }
  }

  vaccinUltimeZombieUltime(){
    if(!this.isImuneTo(InfectionVariant.ZOMBIE_ULTIME)){
      if(this.infectionStatus == InfectionStatus.INFECTED && this.infectionType == InfectionVariant.ZOMBIE_ULTIME){
          this.infectionType = null;
          this.infectionStatus = InfectionStatus.HEALTHY;
      }
      this.vaccinsImunisedVaraint.push(InfectionVariant.ZOMBIE_ULTIME);
    }
  }  
}

function printTree(person, depth = 0) {
  const indentation = "  ".repeat(depth);
  console.log(`${indentation}${person.name} - Infection Status: ${person.infectionStatus} Infection Type: ${person.infectionType} Immunite : ${person.stringListImune()}` +  
  `${person.isAlive && person.infectionStatus == InfectionStatus.HEALTHY? "🙂":person.isAlive && person.infectionStatus == InfectionStatus.INFECTED? "😫": "☠️"}`);
  for (const child of person.cercleSocialDescendant) {
    printTree(child, depth + 1);
  }
}
  
const person1 = new Person("Athos", 25);
const person2 = new Person("Porthos ", 30);
const person3 = new Person("Aramis", 22);
const person4 = new Person("d'Artagnan", 47);
const person5 = new Person("Napoléon", 22);
const person6 = new Person("Bonaparte", 47);

person1.addRelationDescendente(person2);
person1.addRelationDescendente(person3);

person2.addRelationDescendente(person6);
person2.addRelationDescendente(person4);

person3.addRelationDescendente(person4);
person3.addRelationDescendente(person5);

person3.infectionZombieA();
//person3.infectionZombieB()
//person3.infectionZombieC();
//person3.infectionZombie32();
//person3.sprendInfectionZombieUltime();

console.log("Arbre des relations :");
printTree(person1);

console.log("\n\nInjection des vaccins:");
let nbVaccinated = 0
for(const person of [person1, person2, person3, person4, person5, person6]){
  person.vaccinateForZombieBandC(nbVaccinated);
  // person.vaccinateForZombieAand32();
  // person.vaccinUltimeZombieUltime()

  nbVaccinated += 1;
}
console.log("\n\n Arbre des relations :");
printTree(person1);
