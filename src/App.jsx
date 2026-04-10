import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { GROCERY_DATA, CATEGORIES } from './data.js';
import './App.css';

// ─── Storage ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'lf40_grocery_v2';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// ─── Constants ──────────────────────────────────────────────────────────────
const CAT_ICONS = {
  All:     '◈',
  Protein: '🥩',
  Carbs:   '🌾',
  Veggies: '🥦',
  Fats:    '🥑',
  Pantry:  '🧂',
};

const CAT_COLORS = {
  Protein: '#ff7043',
  Carbs:   '#42a5f5',
  Veggies: '#66bb6a',
  Fats:    '#ffca28',
  Pantry:  '#ab47bc',
};

const TABS = ['Browse', 'My List'];

// ─── Header ─────────────────────────────────────────────────────────────────
function Header({ listCount, activeTab, onTabChange }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <span className="header-logo">LF40</span>
          <div>
            <p className="header-title">Smart Grocery</p>
            <p className="header-sub">Lean &amp; Fit Over 40</p>
          </div>
        </div>
        {listCount > 0 && (
          <div className="header-badge">
            <span className="badge-num">{listCount}</span>
            <span className="badge-label">on list</span>
          </div>
        )}
      </div>
      <div className="header-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`header-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
            {tab === 'My List' && listCount > 0 && (
              <span className="htab-count">{listCount}</span>
            )}
          </button>
        ))}
      </div>
    </header>
  );
}

// ─── Category Filter Tabs ────────────────────────────────────────────────────
function CategoryTabs({ active, onChange, counts }) {
  return (
    <nav className="cat-tabs-wrap" aria-label="Filter by category">
      <div className="cat-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-tab ${active === cat ? 'active' : ''}`}
            style={active === cat && cat !== 'All' ? { '--tab-color': CAT_COLORS[cat] } : {}}
            onClick={() => onChange(cat)}
            aria-pressed={active === cat}
          >
            <span className="tab-icon">{CAT_ICONS[cat]}</span>
            <span className="tab-label">{cat}</span>
            {counts[cat] > 0 && (
              <span className="tab-badge">{counts[cat]}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Search Bar ──────────────────────────────────────────────────────────────
function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
      </span>
      <input
        className="search-input"
        type="search"
        placeholder="Search items…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search grocery items"
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Tag Badge ───────────────────────────────────────────────────────────────
function TagBadge({ type }) {
  const labels = { mealPrep: '🍳 Prep', freezer: '🧊 Freeze', budget: '💰 Budget' };
  return <span className={`tag tag-${type}`}>{labels[type]}</span>;
}

// ─── Grocery Item (Browse view) ──────────────────────────────────────────────
function GroceryItem({ item, onList, onToggle }) {
  return (
    <li
      className={`grocery-item ${onList ? 'on-list' : ''}`}
      onClick={() => onToggle(item.id)}
      role="checkbox"
      aria-checked={onList}
      tabIndex={0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onToggle(item.id)}
    >
      <span
        className="item-checkbox"
        style={onList ? { background: CAT_COLORS[item.category] || 'var(--lime)', borderColor: 'transparent' } : {}}
      >
        {onList && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--dark)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className="item-content">
        <span className="item-name">{item.name}</span>
        <span className="item-tags">
          {item.mealPrep && <TagBadge type="mealPrep" />}
          {item.freezer  && <TagBadge type="freezer"  />}
          {item.budget   && <TagBadge type="budget"   />}
        </span>
      </span>
      {item.custom && <span className="item-custom-badge">custom</span>}
    </li>
  );
}

// ─── Section Group ───────────────────────────────────────────────────────────
function SectionGroup({ subcategory, items, listIds, onToggle }) {
  return (
    <div className="section-group">
      <p className="section-sub">{subcategory}</p>
      <ul className="section-list" role="group" aria-label={subcategory}>
        {items.map(item => (
          <GroceryItem
            key={item.id}
            item={item}
            onList={listIds.has(item.id)}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

// ─── Category Section ────────────────────────────────────────────────────────
function CategorySection({ category, items, listIds, onToggle }) {
  const grouped = useMemo(() => {
    const map = {};
    items.forEach(item => {
      const sub = item.subcategory || 'Other';
      if (!map[sub]) map[sub] = [];
      map[sub].push(item);
    });
    return map;
  }, [items]);

  const color = CAT_COLORS[category] || 'var(--lime)';
  const addedCount = items.filter(i => listIds.has(i.id)).length;

  return (
    <section className={`category-section cat-${category}`} aria-label={category}>
      <div className="category-header" style={{ '--cat-color': color }}>
        <span className="cat-icon">{CAT_ICONS[category]}</span>
        <h2 className="cat-title">{category.toUpperCase()}</h2>
        {addedCount > 0 && (
          <span className="cat-added-badge" style={{ background: color }}>
            +{addedCount}
          </span>
        )}
      </div>
      {Object.entries(grouped).map(([sub, subItems]) => (
        <SectionGroup
          key={sub}
          subcategory={sub}
          items={subItems}
          listIds={listIds}
          onToggle={onToggle}
        />
      ))}
    </section>
  );
}

// ─── My List Tab ─────────────────────────────────────────────────────────────
function MyListView({ items, listIds, onToggle, onStartOver, onShare }) {
  const listItems = items.filter(i => listIds.has(i.id));

  // Group by category
  const grouped = useMemo(() => {
    const map = {};
    listItems.forEach(item => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [listItems]);

  const categoryOrder = CATEGORIES.filter(c => c !== 'All');

  if (listItems.length === 0) {
    return (
      <div className="mylist-empty">
        <span className="empty-emoji">📋</span>
        <p className="empty-title">Your list is empty</p>
        <p className="empty-hint">Browse items and tap + to add them here</p>
      </div>
    );
  }

  return (
    <div className="mylist-view">
      {/* Summary strip */}
      <div className="mylist-summary">
        <div className="summary-counts">
          {categoryOrder
            .filter(cat => grouped[cat]?.length > 0)
            .map(cat => (
              <span key={cat} className="summary-cat" style={{ '--cat-color': CAT_COLORS[cat] }}>
                {CAT_ICONS[cat]} {grouped[cat].length}
              </span>
            ))}
        </div>
        <span className="summary-total">{listItems.length} items total</span>
      </div>

      {/* Items grouped by category */}
      {categoryOrder
        .filter(cat => grouped[cat]?.length > 0)
        .map(cat => (
          <div key={cat} className="mylist-cat-group">
            <div className="mylist-cat-header" style={{ '--cat-color': CAT_COLORS[cat] }}>
              <span>{CAT_ICONS[cat]}</span>
              <span className="mylist-cat-name">{cat}</span>
              <span className="mylist-cat-count">{grouped[cat].length}</span>
            </div>
            <ul className="mylist-items" role="list">
              {grouped[cat].map(item => (
                <li key={item.id} className="mylist-item">
                  <span className="mylist-dot" style={{ background: CAT_COLORS[cat] }} />
                  <span className="mylist-item-name">{item.name}</span>
                  <button
                    className="mylist-remove"
                    onClick={() => onToggle(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {/* Action buttons */}
      <div className="mylist-actions">
        <button className="mylist-share-btn" onClick={onShare}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share List
        </button>
        <button className="mylist-reset-btn" onClick={onStartOver}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.32" />
          </svg>
          Start Over
        </button>
      </div>
    </div>
  );
}

// ─── Confirm Modal ───────────────────────────────────────────────────────────
function ConfirmModal({ title, message, confirmLabel, onConfirm, onClose, danger }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <p className="confirm-message">{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button
            className={`btn-add ${danger ? 'btn-danger' : ''}`}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Add Item Modal ──────────────────────────────────────────────────────────
function AddItemModal({ onAdd, onClose, defaultCategory }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(defaultCategory !== 'All' ? defaultCategory : 'Protein');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ name: trimmed, category });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-label="Add custom item" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">ADD ITEM</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">Item name</label>
          <input
            ref={inputRef}
            className="modal-input"
            type="text"
            placeholder="e.g. Salmon fillet"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            maxLength={60}
          />
          <label className="modal-label">Category</label>
          <div className="modal-cats">
            {CATEGORIES.filter(c => c !== 'All').map(cat => (
              <button
                key={cat}
                className={`modal-cat-btn ${category === cat ? 'active' : ''}`}
                style={category === cat ? { '--cat-color': CAT_COLORS[cat] } : {}}
                onClick={() => setCategory(cat)}
              >
                {CAT_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-add" onClick={handleSubmit} disabled={!name.trim()}>
            Add to List
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Share Modal ─────────────────────────────────────────────────────────────
function ShareModal({ items, listIds, onClose }) {
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => {
    const listItems = items.filter(i => listIds.has(i.id));
    const lines = ['🛒 MY GROCERY LIST – Lean & Fit Over 40\n'];

    const grouped = {};
    listItems.forEach(item => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    const categoryOrder = ['Protein','Carbs','Veggies','Fats','Pantry'];
    categoryOrder.forEach(cat => {
      if (!grouped[cat]?.length) return;
      lines.push(`\n${CAT_ICONS[cat]} ${cat.toUpperCase()}`);
      grouped[cat].forEach(i => lines.push(`  • ${i.name}`));
    });

    return lines.join('\n');
  }, [items, listIds]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-share" role="dialog" aria-label="Share list" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">SHARE LIST</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <pre className="share-preview">{text}</pre>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
          <button className={`btn-add ${copied ? 'copied' : ''}`} onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Bar (Browse tab only) ────────────────────────────────────────────
function BottomBar({ onAdd, activeCategory }) {
  return (
    <div className="bottom-bar">
      <div className="bottom-hint">Tap any item to add it to your list</div>
      <button className="bar-btn bar-add" onClick={onAdd} aria-label="Add custom item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Custom Item
      </button>
    </div>
  );
}

// ─── Install Prompt ──────────────────────────────────────────────────────────
function InstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(() =>
    localStorage.getItem('lf40_install_dismissed') === 'true'
  );

  useEffect(() => {
    const handler = e => { e.preventDefault(); setPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!prompt || dismissed) return null;

  const handleInstall = async () => {
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    setPrompt(null);
    setDismissed(true);
    localStorage.setItem('lf40_install_dismissed', 'true');
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('lf40_install_dismissed', 'true');
  };

  return (
    <div className="install-banner">
      <div className="install-text">
        <strong>Add to Home Screen</strong>
        <span>Use as a native app — no App Store needed</span>
      </div>
      <div className="install-actions">
        <button className="install-dismiss" onClick={handleDismiss}>Not now</button>
        <button className="install-btn" onClick={handleInstall}>Install</button>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const saved = loadState();

  const [listIds, setListIds]         = useState(() => new Set(saved?.listIds || []));
  const [customItems, setCustomItems] = useState(() => saved?.customItems || []);
  const [activeTab, setActiveTab]     = useState('Browse');
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]           = useState('');
  const [showAddModal, setShowAddModal]     = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfirm, setShowConfirm]       = useState(false);

  // Persist
  useEffect(() => {
    saveState({ listIds: [...listIds], customItems });
  }, [listIds, customItems]);

  const allItems = useMemo(() => [
    ...GROCERY_DATA,
    ...customItems,
  ], [customItems]);

  const toggleItem = useCallback((id) => {
    setListIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const addCustomItem = useCallback(({ name, category }) => {
    const id = `custom_${Date.now()}`;
    const newItem = {
      id, name, category,
      subcategory: 'My Items',
      mealPrep: false, freezer: false, budget: false,
      custom: true,
    };
    setCustomItems(prev => [...prev, newItem]);
    // Auto-add to list
    setListIds(prev => new Set([...prev, id]));
  }, []);

  const startOver = useCallback(() => {
    setListIds(new Set());
  }, []);

  // Browse: all items, filtered by category + search
  const filteredItems = useMemo(() => {
    let items = allItems;
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [allItems, activeCategory, search]);

  // Category counts for filter tabs (total items per cat, not just unselected)
  const catCounts = useMemo(() => {
    const counts = { All: allItems.length };
    allItems.forEach(i => {
      counts[i.category] = (counts[i.category] || 0) + 1;
    });
    return counts;
  }, [allItems]);

  // Group browse items by category
  const groupedItems = useMemo(() => {
    const map = {};
    filteredItems.forEach(item => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [filteredItems]);

  const categoryOrder = CATEGORIES.filter(c => c !== 'All');
  const listCount = listIds.size;

  return (
    <>
      <InstallPrompt />
      <Header
        listCount={listCount}
        activeTab={activeTab}
        onTabChange={tab => { setActiveTab(tab); setSearch(''); }}
      />

      {activeTab === 'Browse' ? (
        <>
          <CategoryTabs
            active={activeCategory}
            onChange={setActiveCategory}
            counts={catCounts}
          />
          <SearchBar value={search} onChange={setSearch} />

          <main className="app-main">
            {filteredItems.length === 0 ? (
              <div className="empty-state">
                <span className="empty-emoji">🔍</span>
                <p>No items match your search.</p>
              </div>
            ) : (
              categoryOrder
                .filter(cat => groupedItems[cat]?.length > 0)
                .map(cat => (
                  <CategorySection
                    key={cat}
                    category={cat}
                    items={groupedItems[cat]}
                    listIds={listIds}
                    onToggle={toggleItem}
                  />
                ))
            )}
          </main>

          <BottomBar
            onAdd={() => setShowAddModal(true)}
            activeCategory={activeCategory}
          />
        </>
      ) : (
        <main className="app-main app-main--list">
          <MyListView
            items={allItems}
            listIds={listIds}
            onToggle={toggleItem}
            onStartOver={() => setShowConfirm(true)}
            onShare={() => setShowShareModal(true)}
          />
        </main>
      )}

      {showAddModal && (
        <AddItemModal
          onAdd={addCustomItem}
          onClose={() => setShowAddModal(false)}
          defaultCategory={activeCategory}
        />
      )}

      {showShareModal && (
        <ShareModal
          items={allItems}
          listIds={listIds}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          title="START OVER?"
          message="This will clear all items from your list. You can always re-add them from Browse."
          confirmLabel="Clear List"
          danger
          onConfirm={startOver}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
