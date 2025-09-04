const items = [
  { label: 'Grooming', key: 'grooming' },
  { label: 'Health', key: 'health' },
  { label: 'Fitness', key: 'fitness' },
  { label: 'Tutoring', key: 'tutoring' }
];

export default function QuickButtons() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map(i => (
        <button key={i.key} className="btn bg-white/90" onClick={() => console.log('Clicked:', i.key)}>
          <div className="text-sm font-semibold">{i.label}</div>
        </button>
      ))}
    </div>
  );
}
