(this.webpackJsonpkuasv1=this.webpackJsonpkuasv1||[]).push([[13],{177:function(e,t,r){"use strict";var a=r(19),o=r(0),n=(r(178),r(478)),s=r(439),i=r(451),c=r(479),l=r(471),u=r(447),m=r(473),d=r(176),h=r.n(d),p=(r(11),r(12)),f=r(2),b=r(14),g=r(183),y=r(101),j=(r(9),r(102)),_=r(72),v=r(1);t.a=function(){var e=Object(p.b)(),t=Object(a.a)(e,2),r=(t[0],t[1],Object(f.f)()),d=Object(o.useState)(null),O=Object(a.a)(d,2),x=O[0],w=O[1],P=Object(o.useState)(!1),T=Object(a.a)(P,2),S=T[0],N=T[1],k=Object(o.useState)(""),z=Object(a.a)(k,2),K=z[0],W=z[1],C=Object(o.useState)(""),I=Object(a.a)(C,2),A=I[0],Y=I[1],E=Object(o.useState)(!1),U=Object(a.a)(E,2),q=U[0],B=U[1],G=function(){B(!0);var e=x;console.log(e),window.recaptchaVerifier=new j.a.auth.RecaptchaVerifier("sign-in-button",{size:"invisible",callback:function(e){}});var t=window.recaptchaVerifier;j.a.auth().signInWithPhoneNumber(e,t).then((function(e){B(!1),console.log("sms  sent"),window.confirmationResult=e;var t=window.prompt("Enter verification code");e.confirm(t).then((function(e){e.user;N(!0),console.log("user verified the code correctly!")})).catch((function(e){alert("The code you entered was incorrect. Try again!")}))})).catch((function(e){B(!1),alert("There was some error processing your request!")}))},F=function(e,t){""!=e.email&&(B(!0),y.a.createUserWithEmailAndPassword(e.email,e.password).then((function(t){console.log(t.user._delegate.uid),W(e.firstname),Y(e.lastname),B(!1)}),(function(e){B(!1),"auth/admin-restricted-operation"!=e.code&&alert(e.code+". sorry there was some error procesing your request. check your email and password!"),console.log(e.code)})))};return Object(o.useEffect)((function(){return y.a.onAuthStateChanged((function(e){if(e){if(null==e.email)return;if(""==K||""==A)return;return B(!0),void fetch("http://localhost:8080/users/addProfile",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({phone_number:x||"",email:e.email,uid:e.uid,first_name:K,last_name:A})}).then((function(e){if(e.ok)return e.json();throw e})).then((function(e){B(!1),""!=K&&r.push("/signin")})).catch((function(t){B(!1),e.delete().then((function(){console.log("userdeleted")})).catch((function(e){})),alert("Sorry,  Your information is not fully updated! some server error happened. Try again "),"function"===typeof t.json&&t.json().then((function(e){})).catch((function(e){}))}))}}))}),[A]),Object(v.jsxs)("div",{className:"signUp",children:[Object(v.jsxs)(l.a,{elevation:8,style:{padding:"20px",margin:"10px auto "},className:"signUp__paper",children:[Object(v.jsxs)(u.a,{align:"center",children:[Object(v.jsxs)(n.a,{style:{backgroundColor:"green"},children:[" ",Object(v.jsx)(h.a,{})," "]}),Object(v.jsx)("h2",{children:" Sign Up "})]}),Object(v.jsx)(g.c,{initialValues:{email:"",password:"",firstname:"",lastname:""},onSubmit:F,children:function(e){return Object(v.jsx)(g.b,{children:S?Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(g.a,{as:s.a,label:"Firstname",name:"firstname",placeholder:"Enter first name",fullWidth:!0,required:!0,variant:"standard",style:{backgroundColor:"#f7f7f7",marginTop:"10px",marginBottom:"10px"}}),Object(v.jsx)(g.a,{as:s.a,label:"Lastname",name:"lastname",placeholder:"Enter last name",fullWidth:!0,required:!0,variant:"standard",style:{backgroundColor:"#f7f7f7",marginTop:"10px",marginBottom:"10px"}}),Object(v.jsx)(g.a,{as:s.a,label:"Email",name:"email",placeholder:"Enter your email",fullWidth:!0,required:!0,variant:"standard",style:{backgroundColor:"#f7f7f7",marginTop:"10px",marginBottom:"10px"}}),Object(v.jsx)(g.a,{as:s.a,label:"Password",name:"password",placeholder:"Enter password",type:"password",fullWidth:!0,required:!0,variant:"standard",style:{backgroundColor:"#f7f7f7",marginTop:"10px",marginBottom:"10px"}}),Object(v.jsx)(i.a,{type:"submit",color:"primary",fullWidth:!0,variant:"contained",style:{marginTop:"10px",marginBottom:"10px"},onClick:F,children:"Sign up"})]}):Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)(g.a,{as:s.a,label:"Phone Number",name:"Phone Number",placeholder:"Example +251918224567",type:"phonenumber",fullWidth:!0,required:!0,variant:"standard",style:{backgroundColor:"#f7f7f7",marginTop:"10px",marginBottom:"10px"},onChange:function(e){w(e.target.value)}}),Object(v.jsx)("p",{children:" Your phone number is required for verification purposes. We will be sending you verification code "}),Object(v.jsx)(i.a,{id:"sign-in-button",onClick:G,children:" Continue "})]})})}}),Object(v.jsxs)(m.a,{children:["Do you have an account?",Object(v.jsxs)(b.b,{to:"/signin",children:["  ",Object(v.jsx)(c.a,{href:"#",children:" Sign in "}),"  "]})]})]}),q?Object(v.jsx)(_.a,{}):""]})}},178:function(e,t,r){},180:function(e,t,r){"use strict";r(0),r(181);var a=r(1);t.a=function(){return Object(a.jsx)("div",{children:Object(a.jsxs)("article",{className:"terms__article",children:[Object(a.jsx)("header",{className:"terms__article__header",children:Object(a.jsx)("h1",{title:"Terms of Service",className:"terms__article__header__title",children:" Terms of Service"})}),Object(a.jsx)("section",{children:Object(a.jsxs)("div",{className:"terms__article__content",children:[Object(a.jsx)("h2",{className:"terms__article__content__p1",children:"Terms of Service overview"}),Object(a.jsxs)("p",{className:"terms__article__content__p2",children:["Below is an overview of our Terms of Service for our \u201cPlatform\u201d, which means any website, application, or service we offer. You should read the complete Terms of Service because that document (and not this overview) is our legally binding agreement.",Object(a.jsx)("strong",{children:"The Terms of Service includes information about your legal rights and covers areas such as automatic subscription renewals, limitations of liability, resolution of disputes by mandatory arbitration rather than a judge or jury in a court of law, and a class action waiver."})]}),Object(a.jsx)("h3",{className:"terms__article__content__p2",children:" Your relationship with Kuas"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:" By using our Platform, you are agreeing to our Terms of Service. The Terms of Service are a legally binding agreement between you and Kuas."}),Object(a.jsx)("li",{children:" If you break the rules, we may suspend or terminate your account. "}),Object(a.jsx)("li",{children:" We charge for certain aspects of our Platform, and some of these fees are billed on a regular and recurring basis (unless you disable auto-renewal or cancel your subscription)."})]}),Object(a.jsx)("h3",{className:"terms__article__content__p2",children:" Kuas Groups, Organizers and Members"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:" Organizers may establish membership criteria for their own Kuas groups. While there is probably a kuas group out there for everyone, not every kuas group is for you. If you can\u2019t find the right group, you can easily start your own kuas group."}),Object(a.jsx)("li",{children:" Organizers may charge fees for memberships or events. "}),Object(a.jsx)("li",{children:" Using our Platform involves meeting real people and doing real things in the real world, which can sometimes lead to unexpected situations. We can\u2019t control what happens in the real world, and we are not responsible for it. You should use common sense and good judgment when interacting with others."})]}),Object(a.jsx)("h3",{className:"terms__article__content__p2",children:" Your Content and Content of Others"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:" You are responsible for your \u201cContent\u201d, which means any information, material, or other content posted to our Platform. Your Content must comply with our Terms of Service, which includes the Usage and Content Policies, Groups and Events Policies, Organizer and Leadership Standards, Member Restrictions, Payment Policies, Trademark Usage Guidelines, and API License Terms. Your Content is also subject to our Intellectual Property Dispute Policies."}),Object(a.jsx)("li",{children:" We are not responsible for Content that members post or the communications that members send using our Platform. We generally don\u2019t review Content before it\u2019s posted. If you see Content that violates our Terms of Service, you may report inappropriate Content to us."})]}),Object(a.jsx)("h2",{className:"terms__article__content__p1",children:" Terms of Service"}),Object(a.jsx)("p",{className:"terms__article__content__p2",children:"Our Terms of Service contain important information about your legal rights. To make it easier to understand, we have provided summaries and tips in these gray boxes. These summaries are not part of the official terms, and it is important for you to read the language in each section carefully."}),Object(a.jsxs)("h3",{className:"terms__article__content__p5",children:[" ",Object(a.jsx)("strong",{children:"1. This Agreement"})," "]}),Object(a.jsx)("p",{className:"terms__article__content__p2",children:"Summary: You agree to follow some basic rules when using Kuas\u2019s Platform. These rules are described in these Terms of Service, including the related policies and guidelines discussed below. We may change these rules."}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:"1.1 The Agreement."}),'  kuas enables you and other members to arrange offline, real-world Kuas Sport groups and Kuas events. The terms \u201cKuas",\u201d \u201cwe,\u201d \u201cus,\u201d and \u201cour\u201d include Kuas, Inc. and our corporate parent, affiliates, or subsidiaries. We use the terms \u201cyou\u201d and \u201cyour\u201d to mean any person using our Platform, and any organization or person using the Platform on an organization\u2019s behalf. We use the word \u201cPlatform\u201d to mean any website, application, or service offered by Meetup, including content we offer and electronic communications we send. We provide our Platform to you subject to these Terms of Service. We use the terms \u201cTerms of Service\u201d and \u201cAgreement\u201d interchangeably to mean this document together with our Usage and Content Policies, Groups and Events Policies, Organizer and Leadership Standards, Member Restrictions, Payment Policies, Trademark Usage Guidelines, and API License Terms. Your use of the Platform signifies that you agree to this Agreement. If you are using the Platform for an organization, you agree to this Agreement on behalf of that organization, and represent you have authority to bind that organization to the terms contained in this Agreement. If you do not or are unable to agree to this Agreement, do not use our Platform.']}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:"1.2 Revisions to this Agreement."}),"  We may modify this Agreement from time to time. When we do, we will provide notice to you by publishing the most current version and revising the date at the top of this page. If we make any material change to this Agreement, we will provide additional notice to you, such as by sending you an email or displaying a prominent notice on our Platform. By continuing to use the Platform after any changes come into effect, you agree to the revised Agreement. If you do not wish to accept the revised Agreement, you can close your account."]}),Object(a.jsxs)("h3",{className:"terms__article__content__p5",children:[" ",Object(a.jsx)("strong",{children:" 2. Your Account and Membership "})," "]}),Object(a.jsx)("p",{className:"terms__article__content__p2",children:"Summary: You need to be at least 18 years old to use our Platform. Kuas organizers control the Content and membership of their Kuas session groups. However, we may remove any Content you post or terminate your account at any time."}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:"2.1 Eligibility."}),"  Our Platform is available to anyone who is at least 18 years old. You represent that you are at least 18. Additional eligibility requirements for a particular portion of our Platform may be set by any member who has the ability to moderate or manage that portion of our Platform. For example, the eligibility requirements for a Kuas session group or Kuas event may be set by the organizers of that session group or owners of the pitch."]}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:"2.2 Modification, Suspension, and Termination of Your Account. "}),"  We may modify, suspend, or terminate your account or access to the Platform if, in our sole discretion, we determine that you have violated this Agreement, including any of the policies or guidelines that are part of this Agreement, that it is in the best interest of the Meetup community, or to protect our brand or Platform. When this happens, we will notify you of the reasons for the modification, suspension, or termination. We also may remove accounts of members who are inactive for an extended period of time."]}),Object(a.jsxs)("h3",{className:"terms__article__content__p5",children:[" ",Object(a.jsx)("strong",{children:" 3. Fees, Payments, and Offers "}),"   "]}),Object(a.jsx)("p",{className:"terms__article__content__p2",children:"Summary: We charge for certain features on our Platform. If you\u2019re a Kuas group organizer or owner of the pitch, you\u2019re responsible for paying for organizer fees related to your Kuas session group. These fees are billed on a regular and recurring basis (unless you disable auto-renewal or cancel your subscription), and may change in the future."}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:" 3.1 Fees Charged by Kuas."}),"  Use of some of the features on our Platform is free, and we charge fees for other features. We may in the future implement a new fee, or modify an existing fee, for certain current or future features of our Platform. If we implement a new or modified fee, we will give you notice in advance such as by posting changes on our Platform or sending you an email. You agree to pay those fees and any associated taxes for your continued use of the applicable service."]}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:" 3.2 Fees Charged by Organizers. "}),"  Organizers may impose fees related to particular portions of the Platform, such as member dues for a Kuas session group or an event fee for a Kuas event. We reserve the right to initiate refunds of fees paid to organizers, when appropriate, even in cases of fees paid through a third-party payment service. Refunds that we initiate, if any, will be governed by our Payment Policies. Organizers may also have their own refund policies, so long as they are consistent with and do not limit members\u2019 ability to receive refunds under our Payment Policies. Payments made to organizers via the Platform are made through a third-party payment service provider. If a member pays a fee to an organizer via the Platform, the member authorizes the organizer (and the organizer\u2019s applicable payment service provider) to charge the designated payment method for the total amount of the fees, including any applicable taxes and other charges. Certain types of fees charged by organizers may be billed on a recurring basis"]}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:" 3.3 Payments to Kuas. "}),"  Organizers are responsible for paying subscription and any other applicable fees to Kuas on time and through our approved payment methods. Organizers are responsible to pay applicable fees from each group sessions to Kuas on time. You may only pay organizer fees to Kuas using a valid payment method acceptable to us such as cash or credit cards, as specified via the Platform. If we terminate, suspend, or remove your account in connection with violation of this Agreement, we are not obligated to refund any organizer subscription fees paid to Kuas."]}),Object(a.jsxs)("h3",{className:"terms__article__content__p5",children:[" ",Object(a.jsx)("strong",{children:" 4. Intellectual Property "}),"  "]}),Object(a.jsx)("p",{className:"terms__article__content__p2",children:"Summary: If you use Kuas\u2019s trademark, be sure to follow our Trademark Usage Guidelines. Also, don\u2019t infringe on anyone\u2019s intellectual property. If you believe your intellectual property is being infringed somewhere on the Kuas Platform, please follow the procedures in our Intellectual Property Dispute Policies."}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:" 4.1 Intellectual Property of Kuas. "}),"  Kuas trademarks, logos, service marks, and service names are the intellectual property of Kuas. Our Trademark Usage Guidelines explain how you may and may not use them. Our Platform, including our material on the Platform, are also our or our licensors\u2019 intellectual property. Except as described in the Trademark Usage Guidelines, you agree not to use our intellectual property without our prior written consent."]}),Object(a.jsxs)("p",{className:"terms__article__content__p2 indent2",children:[Object(a.jsx)("strong",{children:" 4.2 Intellectual Property of Others. "}),"  Kuas respects the intellectual property of others, and we expect our members to do the same. We may, in appropriate circumstances and in our discretion, remove or disable access to material that we believe may infringe on the intellectual property rights of others. We may also restrict or terminate access to our Platform to those who we believe to be repeat infringers. If you believe your intellectual property rights have been violated, please review our Intellectual Property Dispute Policies."]})]})})]})})}},181:function(e,t,r){},426:function(e,t,r){"use strict";r.r(t);var a=r(5),o=r(68),n=(r(0),r(136),r(180),r(415),r(106)),s=(r(177),r(134),r(69)),i=r(1);t.default=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)(s.a,Object(a.a)({},e)),Object(i.jsx)(n.a,{}),Object(i.jsx)(o.a,{})]})}}}]);
//# sourceMappingURL=13.6f5b2f8d.chunk.js.map