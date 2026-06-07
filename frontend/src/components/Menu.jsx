import '../styles/Menu.css'
import hot from "../assets/images/hot-beverages.png";
import cold from "../assets/images/cold-beverages.png";
import refresh from "../assets/images/refreshment.png";
import combo from "../assets/images/special-combo.png";
import dessert from "../assets/images/desserts.png";
import burger from "../assets/images/burger-frenchfries.png";

const MENU_ITEMS = [
  {
    id: 1,
    image: hot,
    title: 'Hot Beverages',
    description: 'Wide range of Steaming hot coffee to make you fresh and light.',
  },
  {
    id: 2,
    image: cold,
    title: 'Cold Beverages',
    description: 'Creamy and frothy cold coffee to make you cool.',
  },
  {
    id: 3,
    image: refresh,
    title: 'Refreshment',
    description: 'Fruit and icy refreshing drink to make feel refresh.',
  },
  {
    id: 4,
    image: combo,
    title: 'Special Combos',
    description: 'Your favorite eating and drinking combinations.',
  },
  {
    id: 5,
    image: dessert,
    title: 'Dessert',
    description: 'Satiate your palate and take you on a culinary treat.',
  },
  {
    id: 6,
    image: burger,
    title: 'Burger & French Fries',
    description: 'Quick bites to satisfy your small size hunger.',
  },
]


function MenuCard({ image, title, description }) {
  return (
    <div className="menu__card">
      <div className="menu__card-image-wrapper">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default function Menu() {
  return (
    <section className="menu" id="menu">
      <h2 className="section-title">OUR MENU</h2>
      <div className="section-underline" />

     
      <div className="menu__grid">
        
        {MENU_ITEMS.map(item => (
          <MenuCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  )
}
