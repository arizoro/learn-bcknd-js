// oop factory

function convertColor (r,g,b)  {
  const color = {}
        color.r = r
        color.g = g
        color.b = b

  color.rgb = function() {
    const {r,g,b} = this
    return `rgb(${r},${g},${b})`
  }

color.hex = function(){
  const {r,g,b} = this ;
  return '#' + ((1 << 24)+(r << 16)+(g << 8) + b).toString(16).slice(1);
}

  return color;

}

// oop prototype

function Color (r,g,b){
  this.r =  r
  this.g = g
  this.b = b
}

Color.prototype.rgb = function(){
  const {r,g,b} = this;
  return `rgb(${r},${g},${b})`
}

Color.prototype.hex = function (){
  const {r,g,b} = this ;
  return '#' + ((1 << 24)+(r << 16)+(g << 8) + b).toString(16).slice(1);
}

Color.prototype.rgba = function(a = '1.0'){
  const {r,g,b} = this;
  return `rgba(${r},${g},${b},${a})`
}

class Warna {
  constructor(r,g,b,name){
    this.r = r ;
    this.g = g ;
    this.b = b;
    this.name = name;
  }

  innerRgb(){
    const {r,g,b} = this;
    return `${r},${g},${b}`
  }

  namaWarna(){
    console.log('nama warna nya ' + this.name);
  }

  rgb(){
    
    return `rgb(${this.innerRgb()})`
  }

  rgba(a = 1.0){
    return `rgba(${this.innerRgb()},${a})`
  }

  hex(){
    const {r,g,b} = this ;
    return '#' + ((1 << 24)+(r << 16)+(g << 8) + b).toString(16).slice(1);
  }
}

const cekWarna = new Warna(123,123,123,'doft');
document.body.style.backgroundColor = cekWarna.rgba();



class Peliharaan{
  constructor(nama,umur){
    this.nama = nama
    this.umur = umur
  }

  makan(){
    console.log(`${this.nama} lagi asik makan`)
  }

}

class Kucing extends Peliharaan {

  constructor(nama,umur,nyawa){
    super('jhoni',3);
    this.nyawa = nyawa
  }
  mengeong(){
    console.log('meong,meong...')
  }
}


class Anjing extends Peliharaan {

  mengongong(){
    console.log('gukguk gukk...')
  }
}

const hewan = [
  {
    'kucing' : {
      'jenis' : 'anggora',
      'makanan' : 'ikan',
      'suara' : 'meong....'
    },
    'anjing' : {
      'jenis' : 'buldog',
      'makanan' : 'tulang',
      'suara' : 'guk guk guk'
    }
  }
]
console.log(hewan);