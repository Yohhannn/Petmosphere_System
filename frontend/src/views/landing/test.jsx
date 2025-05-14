import React from 'react';

function TestComponent() {
  return (
    <div className="bg-primary text-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Testing Tailwind CSS and DaisyUI</h2>
      <p className="mb-2">This text should be white with a primary background color (from your Tailwind config).</p>
      <button className="btn btn-secondary">DaisyUI Button</button>
      <div className="mt-4">
        <span className="badge badge-accent">Tailwind Badge</span>
      </div>
      <div className="mt-4">
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Success! Tailwind and DaisyUI seem to be working.</span>
        </div>
      </div>
    </div>
  );
}

export default TestComponent;