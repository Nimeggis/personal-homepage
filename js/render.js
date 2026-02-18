/**
 * render.js
 * Loads content.json and dynamically renders all CV sections.
 * To add or update content, edit data/content.json only.
 */

/* =============================================
   HTML builder helpers
   ============================================= */

function locationHTML(text, url) {
  var inner = url
    ? '<a href="' + url + '" class="nm_link_path" target="_blank"><div class="nm_location_title">' + text + '</div></a>'
    : '<div class="nm_location_title">' + text + '</div>';
  return '<div class="nm_location"><img src="img/location.svg" class="nm_location_icon" alt="Location">' + inner + '</div>';
}

function locationAcHTML(text, url) {
  var inner = url
    ? '<a href="' + url + '" class="nm_link_path" target="_blank"><div class="nm_location_title">' + text + '</div></a>'
    : '<div class="nm_location_title">' + text + '</div>';
  return '<div class="nm_location_ac"><img src="img/location.svg" class="nm_location_icon" alt="Location">' + inner + '</div>';
}

function linkHTML(text, url) {
  return '<div class="nm_link"><img src="img/link.svg" class="nm_link_icon" alt="Link">'
    + '<a href="' + url + '" class="nm_link_path" target="_blank"><div class="nm_link_title">' + text + '</div></a></div>';
}

function twoColRow(left, right) {
  return '<div class="nm_cv_center">'
    + '<div class="nm_cv_textbox nm_cv_info">' + left + '</div>'
    + '<div class="nm_cv_textbox nm_cv_middle"></div>'
    + '<div class="nm_cv_textbox">' + right + '</div>'
    + '</div>';
}

/* =============================================
   Section renderers
   ============================================= */

function renderProfessional(jobs) {
  var list = document.getElementById('nm_professional-job-list');
  if (!list) return;

  list.innerHTML = jobs.map(function (job) {
    var left = '<p class="nm_company">' + job.company + '</p>'
      + (job.subCompany ? '<p class="nm_sub_company">' + job.subCompany + '</p>' : '')
      + '<p class="nm_period">' + job.period + '</p>';

    var right = '<p class="nm_job_title">' + job.title + '</p>'
      + '<p class="nm_job_description">' + job.description + '</p>'
      + locationHTML(job.location, job.locationUrl)
      + linkHTML(job.link, job.linkUrl);

    return '<div class="nm_job">' + twoColRow(left, right) + '</div>';
  }).join('');
}

function renderAcademic(entries) {
  var list = document.getElementById('nm_academic-job-list');
  if (!list) return;

  list.innerHTML = entries.map(function (entry) {
    var left = '<p class="nm_company">' + entry.institution + '</p>'
      + '<p class="nm_period">' + entry.period + '</p>';

    var addons = (entry.addons || []).map(function (a) {
      return '<p class="nm_job_addon">' + a + '</p>';
    }).join('');

    var right = '<p class="nm_job_title">' + entry.title + '</p>'
      + '<p class="nm_job_description">' + entry.description + '</p>'
      + addons
      + locationAcHTML(entry.location, entry.locationUrl);

    return '<div class="nm_academic">' + twoColRow(left, right) + '</div>';
  }).join('');
}

function renderPublications(publications) {
  var list = document.getElementById('nm_publication_list');
  if (!list) return;

  list.innerHTML = publications.map(function (pub) {
    var left = '<p class="nm_company">' + pub.title + '</p>'
      + '<p class="nm_period">' + pub.date + '</p>';

    var right = '<p class="nm_job_description">'
      + pub.abstract
      + (pub.abstractMore
        ? ' <span class="read-more-content hidden">' + pub.abstractMore + '</span>'
        : '')
      + '</p>'
      + (pub.abstractMore
        ? '<button class="read-more-btn"><span>Read more</span></button>'
        : '')
      + linkHTML('Show Publication', pub.doi);

    return '<div class="nm_publication">' + twoColRow(left, right) + '</div>';
  }).join('');

  // Re-attach read-more listeners after fresh render
  attachReadMoreListeners(list);
}

function renderCertifications(certifications) {
  var list = document.getElementById('nm_certificate-list');
  if (!list) return;

  list.innerHTML = certifications.map(function (cert) {
    var left = '<p class="nm_cert_name">' + cert.name + '</p>'
      + '<p class="nm_date">' + cert.date + '</p>';

    var right = '<p class="nm_cert_title">' + cert.issuer + '</p>'
      + linkHTML(cert.link, cert.linkUrl);

    return '<div class="nm_certificate">'
      + '<div class="nm_certifications_center">'
      + '<div class="nm_certifications_textbox nm_certifications_info">' + left + '</div>'
      + '<div class="nm_certifications_textbox nm_certifications_middle"></div>'
      + '<div class="nm_certifications_textbox">' + right + '</div>'
      + '</div></div>';
  }).join('');
}

function renderAwards(awards) {
  var container = document.getElementById('nm_awards_container');
  if (!container) return;

  container.innerHTML = awards.map(function (award) {
    var left = '<p class="nm_awards_name">' + award.organization + '</p>'
      + '<p class="nm_date">' + award.date + '</p>';

    var right = '<p class="nm_award_title">' + award.title + '</p>'
      + linkHTML(award.link, award.linkUrl);

    return '<div class="nm_awards_center">'
      + '<div class="nm_awards_textbox nm_awards_info">' + left + '</div>'
      + '<div class="nm_awards_textbox nm_awards_middle"></div>'
      + '<div class="nm_awards_textbox">' + right + '</div>'
      + '</div>';
  }).join('');
}

function renderVolunteering(entries) {
  var container = document.getElementById('nm_volunteering_container');
  if (!container) return;

  container.innerHTML = entries.map(function (entry) {
    var left = '<p class="nm_volunteering_name">' + entry.organization + '</p>'
      + '<p class="nm_date">' + entry.period + '</p>';

    var right = '<p class="nm_volunteer_title">' + entry.title + '</p>'
      + '<p class="nm_volunteer_description">' + entry.description + '</p>'
      + linkHTML(entry.link, entry.linkUrl);

    return '<div class="nm_volunteering_center">'
      + '<div class="nm_volunteering_textbox nm_volunteering_info">' + left + '</div>'
      + '<div class="nm_volunteering_textbox nm_volunteering_middle"></div>'
      + '<div class="nm_volunteering_textbox">' + right + '</div>'
      + '</div>';
  }).join('');
}

/* =============================================
   Read-more listener (also called from script.js init)
   ============================================= */
function attachReadMoreListeners(root) {
  var scope = root || document;
  scope.querySelectorAll('.read-more-btn').forEach(function (button) {
    // Avoid double-binding
    button.replaceWith(button.cloneNode(true));
  });
  scope.querySelectorAll('.read-more-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var paragraph = button.closest('.nm_cv_textbox').querySelector('.read-more-content');
      if (paragraph) {
        var isHidden = paragraph.classList.contains('hidden');
        paragraph.classList.toggle('hidden');
        button.innerHTML = isHidden ? '<span>Read less</span>' : '<span>Read more</span>';
      }
    });
  });
}

/* =============================================
   Bootstrap: fetch JSON and render everything
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  fetch('data/content.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Failed to load content.json: ' + response.status);
      return response.json();
    })
    .then(function (data) {
      renderProfessional(data.professional || []);
      renderAcademic(data.academic || []);
      renderPublications(data.publications || []);
      renderCertifications(data.certifications || []);
      renderAwards(data.awards || []);
      renderVolunteering(data.volunteering || []);

      // Initialise collapsible lists AFTER content is in the DOM
      if (typeof initCollapsibleList === 'function') {
        initCollapsibleList('#nm_professional-job-list', '.nm_job', 'pbj-show-more-btn', 'Professional Background', 3);
        initCollapsibleList('#nm_academic-job-list', '.nm_academic', 'abj-show-more-btn', 'Academic Background', 3);
        initCollapsibleList('#nm_publication_list', '.nm_publication', 'show-more-btn', 'Publications', 3);
        initCollapsibleList('#nm_certificate-list', '.nm_certificate', 'cert-show-more-btn', 'Certifications', 5);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
});
