import React from 'react';
import Link from 'next/link';
import './index.scss';

const LINK_GROUPS = [
  {
    name: 'Custom Feeds',
    options: [
      {
        label: 'Flipboard',
        link: '/feeds/flipboard'
      }
    ]
  },
  {
    name: 'Metadata',
    options: [
      {
        label: 'Optimize Post',
        link: '/metadata/update'
      }
    ]
  }
];

const Header = () => (
  <header className="Header">
    <nav className="Header__nav">
      <div className="Header__nav-group">
        <h4>
          <Link href="/">
            <a className="Header__nav-link">Dashboard</a>
          </Link>
        </h4>
      </div>
      {LINK_GROUPS.map(group => (
        <div className="Header__nav-group" key={group.name}>
          {group.name !== '' && <h4>{group.name}</h4>}
          <ul className="Header__nav-items">
            {group.options.map(option => (
              <li className="Header__nav-item" key={option.link}>
                <Link href={option.link}>
                  <a className="Header__nav-link">{option.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  </header>
);

export default Header;
