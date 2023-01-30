import React, { Component, createElement } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import mob1img from './mob1.png';
import mob2img from './mob2.png';
import v from './v.png';



class App extends Component {
  mob1 = {
    max_hp: 100,
    hp: 100,
    gold: 50,
    img: mob1img
  }
  mob2 = {
    max_hp: 500,
    hp: 500,
    gold: 100,
    img: mob2img
  }
  enemy = {
    mob: this.mob1
  }
  item_d = {
    name:"Дедалус",
    crit:1.5,
    crit_chance:30,
    damage:2,
    cost:150,
  }
  player = 
  {
    damage: 1,
    crit: 0,
    crit_chance: 0,
    money: 150,
    monster_count: 0,
    items: []
  }
  getPlayerDamage()
  {
    let dmg = this.player.damage
    let crit = this.player.crit
    let crit_chance = this.player.crit_chance
      for (var i = 0; i < this.player.items.length; i++) {
        dmg += this.player.items[i].damage
        crit += this.player.items[i].crit
        crit_chance += this.player.items[i].crit_chance
      } 
    var min = 1;
    var max = 100;
    var rand =  min + (Math.random() * (max-min));
    if(rand<crit_chance)
    {
      dmg*=crit
    }
    return dmg;
  }
  onPress = () => {
    console.log(this.player)
    this.setState({
      hp: this.enemy.mob.hp -= this.getPlayerDamage()
    });
    if(this.enemy.mob.hp <= 0)
    {
      this.player.money += this.enemy.mob.gold
      this.player.monster_count++
      this.enemy.mob.hp = this.enemy.mob.max_hp
    }
    if(this.player.monster_count===3)
    {
      this.enemy.mob = this.mob2
    }
    if(this.player.monster_count===10)
    {
      this.player.items = []
      this.player.damage = 0
      this.enemy.mob.img = v
    }
  }
  onPressBuy(txt) {
    if(txt.cost>this.player.money)
    {
      return;
    }
    this.player.items.push(txt)
    this.setState({
      money: this.player.money -= txt.cost
    });
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.container1}>
          <Text>
            Магазин
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressBuy(this.item_d)}
          >
            <Text>
              Купить {this.item_d.name} стоимость {this.item_d.cost}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <Text>
            Золото {this.player.money}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <img src={this.enemy.mob.img} />
        </TouchableOpacity>
        <View>
          <Text>
            Здоровье монстра {this.enemy.mob.hp}/{this.enemy.mob.max_hp}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    position: 'absolute',
    top:'20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    position: 'absolute',
    bottom:'20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transperenty',
    padding: 10,
    marginBottom: 10
  }
})
export default App;
