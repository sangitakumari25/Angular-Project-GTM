import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-tnx',
  templateUrl: './tnx.component.html',
  styleUrls: ['./tnx.component.css']
})
export class TNXComponent implements OnInit {

  private currentEditData: any = {};

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // Initialize all UI interactions
    this.initializeTabs();
    this.setupFormInteractions();
    this.animateProgressBar(5); // default current step = 5
    this.setupEditButtons();
  }

  // -------------------- Tab Switching Functionality --------------------
  private initializeTabs(): void {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        tab.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}-tab`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // -------------------- Setup Form Interactions --------------------
  private setupFormInteractions(): void {
    const inputs = document.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        const value = (input as HTMLInputElement).value;
        console.log('Field changed:', value);
      });
    });

    const saveBtns = document.querySelectorAll('.section-save-btn');
    saveBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSave();
      });
    });

    const editBtn = document.querySelector('.btn-edit');
    if (editBtn) {
      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleEdit();
      });
    }
  }

  // -------------------- Handle Save Action --------------------
  private handleSave(): void {
    const formData: any = {};
    const inputs = document.querySelectorAll('.form-input, .form-select');

    inputs.forEach(input => {
      const el = input as HTMLInputElement | HTMLSelectElement;
      if (el.value) {
        formData[el.name || el.id] = el.value;
      }
    });

    console.log('Saving data:', formData);
    this.showNotification('Changes saved successfully!', 'success');
  }

  // -------------------- Handle Edit Action --------------------
  private handleEdit(): void {
    console.log('Edit mode activated');
    // this.showNotification('Edit mode enabled', 'info');
  }

  // -------------------- Progress Bar Animation --------------------
  private animateProgressBar(currentStep: number): void {
    const steps = document.querySelectorAll('.progress-step');
    const lines = document.querySelectorAll('.progress-line');
    const animationDelay = 500;

    setTimeout(() => {
      for (let i = 0; i < currentStep; i++) {
        setTimeout(() => {
          if (i < currentStep - 1) {
            steps[i].classList.add('completed');
            if (lines[i]) lines[i].classList.add('completed');
          } else {
            steps[i].classList.add('active');
          }
        }, i * animationDelay);
      }
    }, 300);
  }

  // -------------------- Edit Panel --------------------
  private openEditPanel(sectionTitle: string, dataCard: HTMLElement): void {
    const panel = document.getElementById('editPanel') as HTMLElement;
    const overlay = document.getElementById('editPanelOverlay') as HTMLElement;
    const panelTitle = document.getElementById('editPanelTitle') as HTMLElement;
    const panelContent = document.getElementById('editPanelContent') as HTMLElement;

    if (!panel || !overlay || !panelTitle || !panelContent) return;

    panelTitle.textContent = 'Edit ' + sectionTitle;

    const summaryItems = dataCard.querySelectorAll('.summary-item');
    let formHTML = '';

    this.currentEditData = {};

    summaryItems.forEach((item: any, index: number) => {
      const key = item.querySelector('.summary-key')?.textContent || '';
      const value = item.querySelector('.summary-value')?.textContent || '';

      this.currentEditData[key] = value;

      formHTML += `
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">${key}</label>
          <input type="text" id="edit-field-${index}" value="${value}"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-default);
            border-radius: 6px; font-size: 14px; color: var(--text-primary); transition: border-color 0.2s;"
            onfocus="this.style.borderColor='var(--blue-500)'"
            onblur="this.style.borderColor='var(--border-default)'">
        </div>
      `;
    });

    panelContent.innerHTML = formHTML;

    overlay.style.display = 'block';
    panel.style.display = 'block';
    setTimeout(() => {
      panel.style.right = '0';
    }, 10);
  }

  private closeEditPanel(): void {
    const panel = document.getElementById('editPanel') as HTMLElement;
    const overlay = document.getElementById('editPanelOverlay') as HTMLElement;

    if (!panel || !overlay) return;

    panel.style.right = '-500px';
    setTimeout(() => {
      panel.style.display = 'none';
      overlay.style.display = 'none';
    }, 300);
  }

  
  private saveEditPanel(): void {
    const panelContent = document.getElementById('editPanelContent') as HTMLElement;
    const inputs = panelContent?.querySelectorAll('input');
    const sectionTitle = (document.getElementById('editPanelTitle')?.textContent || '').replace('Edit ', '');

    const allCards = document.querySelectorAll('.data-card');
    let targetCard: HTMLElement | null = null;

    allCards.forEach(card => {
      const cardTitle = card.querySelector('.data-card-title');
      if (cardTitle && cardTitle.textContent === sectionTitle) {
        targetCard = card as HTMLElement;
      }
    });

   
    if (targetCard && inputs) {
      const summaryItems = (targetCard as HTMLElement).querySelectorAll('.summary-item');
      inputs.forEach((input: any, index: number) => {
        const valueSpan = summaryItems[index]?.querySelector('.summary-value');
        if (valueSpan) valueSpan.textContent = input.value;
      });
    }

    this.closeEditPanel();
  }

  private setupEditButtons(): void {
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const dataCard = button.closest('.data-card');
        if (!dataCard) return;
        const sectionTitle = dataCard.querySelector('.data-card-title')?.textContent || '';
        const cardBody = dataCard.querySelector('.data-card-body') as HTMLElement;
        if (sectionTitle && cardBody) {
          this.openEditPanel(sectionTitle, cardBody);
        }
      });
    });

    const overlay = document.getElementById('editPanelOverlay');
    overlay?.addEventListener('click', () => this.closeEditPanel());
  }

  // -------------------- Show Notification --------------------
  private showNotification(message: string, type: string = 'success'): void {
    const notification = this.renderer.createElement('div');
    const bgColor = type === 'success' ? '#22C55E' : '#3B82F6';

    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      background: bgColor,
      color: 'white',
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '9999',
      fontSize: '14px',
      fontWeight: '500',
      animation: 'slideIn 0.3s ease-out'
    });

    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
      (notification as HTMLElement).style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // -------------------- Utility: Format Currency --------------------
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // -------------------- Utility: Format Date --------------------
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }
}
