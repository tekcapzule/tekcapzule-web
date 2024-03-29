import { Component, ViewChild } from '@angular/core';
import { Accordion } from 'primeng/accordion';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent {
  qaList: any[] = [
    {
      title: "Subscription and Billing",
      qa: [
        {
          qus: "How can I subscribe to the TekCapzule training platform?",
          ans: "You can subscribe by creating an account on our website or app. Once you're logged in, click on \"Try for free\" to select your preferred subscription plan and follow the prompts to complete the payment."
        },
        {
          qus: "What payment methods do you accept?",
          ans: "We accept all major credit cards, PayPal, and select digital wallets. The availability of certain payment methods may vary by country."
        },
        {
          qus: "Is my payment information secure?",
          ans: "Absolutely. Our payment gateway partner use state-of-the-art encryption technology to ensure your personal information and payment details are always safe."
        },
        {
          qus: "How do I cancel my subscription?",
          ans: "To cancel your subscription, log in to your account, navigate to the \"My Account\" section, select \"Manage Subscription\" and then choose \"Cancel Subscription\". Please note that cancellations must be made at least 48 hours before your next billing cycle to avoid being charged."
        }
      ]
    }, {
      title: "Technical Support",
      qa: [
        {
          qus: "What should I do if I'm having trouble accessing the platform?",
          ans: "First, try refreshing your page or restarting your device. If the problem persists, please contact our technical support team at <a href=\"mailto:contact@tekcapzule.com\">contact@tekcapzule.com</a>, providing as much detail about the issue as possible."
        },
        {
          qus: "Is there any system requirement to use the platform?",
          ans: "Our platform can be accessed via web browsers like Chrome, Firefox, Safari, and Edge on both desktop and mobile devices. For optimal performance, we recommend using the latest browser versions."
        }
      ]
    },
    {
      title: "Account Management",
      qa: [
        {
          qus: "How can I change my account details?",
          ans: "To change your account details, simply log in and navigate to \"My Account\". Here you can update your name, email address, password, and other account information."
        },
        {
          qus: "I forgot my password. What should I do?",
          ans: "If you've forgotten your password, go to the login page and click on \"Forgot Password\". You will be prompted to enter your email address. Once submitted, you will receive an email with instructions on how to reset your password."
        },
        {
          qus: "How can I delete my account?",
          ans: "To delete your account, please contact our support team at <a href=\"maito:contact@tekcapzule.com\">contact@tekcapzule.com</a>. Note that deleting your account will permanently erase your account details, course progress, and any certificates earned."
        }
      ]
    },
    {
      title: "Community and Networking",
      qa: [
        {
          qus: "Are there opportunities for networking and collaboration?",
          ans: "Definitely! We have a community forum where you can engage in discussions, share ideas, and collaborate with other learners. We also host regular webinars and Q&A sessions with industry experts."
        },
        {
          qus: "How can I report inappropriate behavior in the community forums?",
          ans: "If you encounter any inappropriate behavior or content in the forums, please report it by emailing our support team (<a href=\"maito:contact@tekcapzule.com\">contact@tekcapzule.com</a>). We take these reports very seriously and aim to maintain a respectful and inclusive learning environment."
        }
      ]
    }
  ];
  searchText: string;
  selectedQA: any;
  selectedQus: any;
  selectedAns: any;
  @ViewChild('accordion') accordion: Accordion;

  constructor() {

  }

  onSearch() {
    this.qaList.forEach((list, index) => {
      if (this.searchText && this.searchText.trim().length > 0) {
        if (list.title.toLowerCase().includes(this.searchText.toLowerCase())) {
          this.selectedQA = list;
          this.accordion.activeIndex = index;
        }
      } else {
        list.qa.forEach(qa => {
          if (qa.qus.includes(this.searchText.toLowerCase()) ) {
            this.selectedQus = list;
            this.selectedQA = list;
            this.accordion.activeIndex = index;
          } else if(qa.ans.includes(this.searchText.toLowerCase())) {
            this.selectedAns = list;
            this.selectedQA = list;
            this.accordion.activeIndex = index;
          }
        });
      }
    });
  }
}
