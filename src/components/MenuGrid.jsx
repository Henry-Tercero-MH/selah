import MenuItem from './MenuItemNew';

const MenuGrid = ({ items, onItemClick }) => {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Grid de items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            index={index}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuGrid;
