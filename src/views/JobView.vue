<template>
  <div class="jobpage">
     <HeaderB class="header"/>
      <div class="main">
          <section class="sec1">
             <h3>{{ filteredJobs.length }} VERIFIED VACANCIES LIVE NOW</h3>
             <h2>Find your next role.</h2>
              <div class="place3">
                  <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Job title or keyword --- e.g. Product Designer"
                  />
                  <div class="placeIn">
                      <input
                        type="text"
                        class="location-input"
                        v-model="locationQuery"
                        placeholder="Location e.g. Lagos"
                      />
                      <div><button class="search" @click="clearAll">Search</button></div>
                  </div>
              </div>
          </section>
          <section class="sec2">
              <div class="part">
                  <div class="part1">
                      <ul>
                          <li id="categorieslink" :class="{ active: selectedCategory === '' }">
                            <a href="#" @click.prevent="setCategory('')">All categories</a><span>{{ filteredJobs.length }}</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Design' }">
                            <a href="#" @click.prevent="setCategory('Design')">Design</a><span>74</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Engineering' }">
                            <a href="#" @click.prevent="setCategory('Engineering')">Engineering</a><span>29</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Marketing' }">
                            <a href="#" @click.prevent="setCategory('Marketing')">Marketing</a><span>22</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Sales' }">
                            <a href="#" @click.prevent="setCategory('Sales')">Sales</a><span>31</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Data' }">
                            <a href="#" @click.prevent="setCategory('Data')">Data & Analytics</a><span>27</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Operations' }">
                            <a href="#" @click.prevent="setCategory('Operations')">Operations</a><span>31</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Customer Support' }">
                            <a href="#" @click.prevent="setCategory('Customer Support')">Customer Support</a><span>16</span>
                          </li>
                          <li :class="{ active: selectedCategory === 'Finance' }">
                            <a href="#" @click.prevent="setCategory('Finance')">Finance</a><span>22</span>
                          </li>
                      </ul>
                  </div>
                  <div class="part2">
                     <div class="partA">
                        <div class="filterheader">
                            <h4>FILTERS</h4>
                            <span class="clear" @click="resetFilters">clear all</span>
                        </div>
                        <div class="filter">
                            <h4>Job type</h4>
                            <div class="filter f1">
                                <div class="inputp">
                                    <input type="checkbox" id="fulltime" value="Full-time" v-model="selectedJobTypes" />
                                    <label for="fulltime">Full-time</label>
                                </div>
                                <div class="inputp">
                                    <input type="checkbox" id="parttime" value="Part-time" v-model="selectedJobTypes" />
                                    <label for="parttime">Part-time</label>
                                </div>
                                <div class="inputp">
                                    <input type="checkbox" id="contract" value="Contract" v-model="selectedJobTypes" />
                                    <label for="contract">Contract</label>
                                </div>
                                <div class="inputp">
                                    <input type="checkbox" id="remote" value="Remote" v-model="selectedJobTypes" />
                                    <label for="remote">Remote</label>
                                </div>
                            </div>

                            <h4>Experience level</h4>
                            <div class="filter f2">
                                <div class="inputp">
                                    <input type="radio" id="entry" value="Entry level" v-model="selectedExperience" name="experience" />
                                    <label for="entry">Entry level</label>
                                </div>
                                <div class="inputp">
                                    <input type="radio" id="mid" value="Mid level" v-model="selectedExperience" name="experience" />
                                    <label for="mid">Mid level</label>
                                </div>
                                <div class="inputp">
                                    <input type="radio" id="senior" value="Senior" v-model="selectedExperience" name="experience" />
                                    <label for="senior">Senior</label>
                                </div>
                                <div class="inputp">
                                    <input type="radio" id="lead" value="Lead / Manager" v-model="selectedExperience" name="experience" />
                                    <label for="lead">Lead / Manager</label>
                                </div>
                            </div>

                            <h4>Salary range</h4>
                            <div class="filter f3">
                                <div class="inputp">
                                    <input type="checkbox" id="lowpay" value="low" v-model="selectedSalaryRanges" />
                                    <label for="lowpay">₦200k - ₦500k</label>
                                </div>
                                <div class="inputp">
                                    <input type="checkbox" id="midpay" value="mid" v-model="selectedSalaryRanges" />
                                    <label for="midpay">₦500k - ₦1m</label>
                                </div>
                                <div class="inputp">
                                    <input type="checkbox" id="highpay" value="high" v-model="selectedSalaryRanges" />
                                    <label for="highpay">₦1m+</label>
                                </div>
                            </div>
                        </div>
                     </div>

                     <div class="partB">
                        <div class="vacancyheader">
                            <div class="found">
                              <p><span>{{ filteredJobs.length }}</span> vacancies found</p>
                            </div>
                            <div class="sort">
                              sortby
                              <select name="sortby" id="sortby" v-model="sortBy">
                                <option value="newest">Newest</option>
                                <option value="salary">Salary: high to low</option>
                                <option value="relevance">Relevance</option>
                              </select>
                            </div>
                        </div>

                        <div class="joblistings">
                          <div
                            v-for="job in paginatedJobs"
                            :key="job.id"
                            class="jobplate"
                          >
                            <div class="comp-abb">{{ job.initials }}</div>
                            <div class="comp-detail">
                              <h3>{{ job.title }}</h3>
                              <p>{{ job.company }} • {{ job.location }}</p>
                              <ul>
                                <li class="type">{{ job.type }}</li>
                                <li class="level">{{ job.level }}</li>
                                <li class="salary-range">{{ job.category }}</li>
                              </ul>
                              <p class="salary-q">{{ job.salaryText }}</p>
                            </div>
                            <div class="fav">
                              <button class="save-job-btn" type="button" @click="toggleSavedJob(job)">
                                {{ savedJobs.some((entry) => entry.id === job.id && entry.saved) ? 'Saved' : 'Save' }}
                              </button>
                              <button class="apply-job-btn" type="button" @click="applyForJob(job)">Apply</button>
                              <div class="duration"><span>Posted {{ job.posted }} ago</span></div>
                            </div>
                          </div>
                        </div>

                        <nav aria-label="Page navigation example">
                          <ul class="pagination pagination-controls">
                            <li class="page-item nav-item" :class="{ disabled: currentPage === 1 }">
                              <button
                                class="page-link nav-button"
                                type="button"
                                @click="prevPage"
                                aria-label="Previous page"
                              >Previous</button>
                            </li>
                            <li class="page-item current-page">
                              <span class="current-page-label">{{ currentPage }}</span>
                            </li>
                            <li class="page-item nav-item" :class="{ disabled: currentPage === pageCount }">
                              <button
                                class="page-link nav-button"
                                type="button"
                                @click="nextPage"
                                aria-label="Next page"
                              >Next</button>
                            </li>
                          </ul>
                        </nav>

                     </div>


                  </div>
              </div>
          </section>
      </div>
      <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import HeaderB from '../components/HeaderB.vue'
import Footer from '../components/Footer.vue'
import { useJobhuntStore } from '../stores/jobhunt.js'

const originalJobs = [
  {
    "id": 1,
    "initials": "QU",
    "title": "QA Lead",
    "company": "Quillmark",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "R179k - R307k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 2,
    "initials": "LA",
    "title": "Head of Sales",
    "company": "Longview Analytics",
    "location": "Remote (Global)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "$197k - $263k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 3,
    "initials": "GR",
    "title": "Principal Sales Operations Analyst",
    "company": "Greenpay",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "R785k - R1.6m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 4,
    "initials": "EM",
    "title": "Mid-level Head of Product",
    "company": "Emberly",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "£305k - £538k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 5,
    "initials": "NA",
    "title": "Junior Enterprise Sales Rep",
    "company": "Naijacart",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "GH₵148k - GH₵213k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 6,
    "initials": "YC",
    "title": "Lead Talent Acquisition Specialist",
    "company": "Yield Capital",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "£1m - £1.7m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 7,
    "initials": "RO",
    "title": "Mid-level HR Business Partner",
    "company": "Rootcode",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Human Resources",
    "salaryText": "₦333k - ₦625k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 8,
    "initials": "ZT",
    "title": "Lead Business Development Manager",
    "company": "Zephyr Travel",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦898k - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 9,
    "initials": "NA",
    "title": "Analytics Manager",
    "company": "Naijacart",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "₦290k - ₦420k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 10,
    "initials": "TF",
    "title": "Lead Cloud Infrastructure Engineer",
    "company": "Timberline Foods",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "On-site",
    "category": "DevOps",
    "salaryText": "$1.1m - $1.5m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 11,
    "initials": "CO",
    "title": "Principal Penetration Tester",
    "company": "Coralwave",
    "location": "London, UK",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "£1.3m - £1.8m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 12,
    "initials": "HA",
    "title": "Senior Machine Learning Engineer",
    "company": "Havenly",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦467k - ₦580k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 13,
    "initials": "AR",
    "title": "Accountant",
    "company": "Amberly Retail",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Finance",
    "salaryText": "₦435k - ₦559k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 14,
    "initials": "SE",
    "title": "Lead Editor",
    "company": "Solaris Energy",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "$1.1m - $1.4m / month",
    "salaryRank": "high",
    "posted": "12 hours"
  },
  {
    "id": 15,
    "initials": "CS",
    "title": "Senior Associate Product Manager",
    "company": "Cove Studio",
    "location": "Nairobi, Kenya",
    "type": "Freelance",
    "level": "On-site",
    "category": "Product",
    "salaryText": "KSh493k - KSh783k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 16,
    "initials": "SE",
    "title": "Principal Site Reliability Engineer",
    "company": "Solaris Energy",
    "location": "Remote (Nigeria)",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦260k - ₦392k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 17,
    "initials": "BA",
    "title": "Senior Sales Operations Analyst",
    "company": "Basecamp Africa",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "$922k - $1.6m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 18,
    "initials": "FA",
    "title": "Principal Product Owner",
    "company": "Farmly",
    "location": "Kigali, Rwanda",
    "type": "Internship",
    "level": "Remote",
    "category": "Product",
    "salaryText": "RF542k - RF718k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 19,
    "initials": "ZT",
    "title": "Lead Content Strategist",
    "company": "Zephyr Travel",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Content",
    "salaryText": "₦368k - ₦658k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 20,
    "initials": "LE",
    "title": "Business Development Manager",
    "company": "Lumos Education",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "GH₵149k - GH₵290k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 21,
    "initials": "JA",
    "title": "Software Engineer",
    "company": "Jetstream Air",
    "location": "Kano, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦491k - ₦782k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 22,
    "initials": "IC",
    "title": "Mid-level Content Writer",
    "company": "Ivory Consulting",
    "location": "Nairobi, Kenya",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "KSh333k - KSh446k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 23,
    "initials": "FA",
    "title": "Lead Head of Product",
    "company": "Farmly",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦465k - ₦626k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 24,
    "initials": "RO",
    "title": "Lead Data Scientist",
    "company": "Rootcode",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "₦1.3m - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 25,
    "initials": "MC",
    "title": "Junior Project Coordinator",
    "company": "Marketplace Co",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Operations",
    "salaryText": "₦118k - ₦177k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 26,
    "initials": "BA",
    "title": "Junior Help Desk Analyst",
    "company": "Basecamp Africa",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "RF424k - RF619k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 27,
    "initials": "SU",
    "title": "Mid-level DevOps Engineer",
    "company": "Suretrust",
    "location": "Ibadan, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦191k - ₦325k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 28,
    "initials": "VF",
    "title": "Data Scientist",
    "company": "Verdant Farms",
    "location": "Kano, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Data",
    "salaryText": "₦215k - ₦328k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 29,
    "initials": "WR",
    "title": "Engineering Manager",
    "company": "Westgate Retail",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Engineering",
    "salaryText": "KSh173k - KSh223k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 30,
    "initials": "HA",
    "title": "Senior QA Lead",
    "company": "Harborlight",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "RF779k - RF1.2m / month",
    "salaryRank": "high",
    "posted": "1 month"
  },
  {
    "id": 31,
    "initials": "DS",
    "title": "Junior Product Manager",
    "company": "Driftwood Studio",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦209k - ₦282k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 32,
    "initials": "AA",
    "title": "Account Manager",
    "company": "Anchor Analytics",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "₦415k - ₦609k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 33,
    "initials": "EH",
    "title": "Principal Head of Product",
    "company": "Elevate HR",
    "location": "Remote (Global)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "$1m - $1.4m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 34,
    "initials": "PR",
    "title": "Senior Bookkeeper",
    "company": "Pinnacle Retail",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "₦472k - ₦674k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 35,
    "initials": "DF",
    "title": "Mid-level Release Manager",
    "company": "Delta Freight",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "R497k - R691k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 36,
    "initials": "IC",
    "title": "Principal Sales Development Representative",
    "company": "Ivory Consulting",
    "location": "Nairobi, Kenya",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "KSh935k - KSh1.3m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 37,
    "initials": "IL",
    "title": "Mid-level Help Desk Analyst",
    "company": "Ironclad Legal",
    "location": "Remote (Africa)",
    "type": "Contract",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "$250k - $356k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 38,
    "initials": "EM",
    "title": "Principal Head of Product",
    "company": "Emberly",
    "location": "Remote (Global)",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "$746k - $1.3m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 39,
    "initials": "HA",
    "title": "Mid-level Content Strategist",
    "company": "Harborlight",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Content",
    "salaryText": "₦370k - ₦654k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 40,
    "initials": "EM",
    "title": "Mid-level Sales Executive",
    "company": "Emberly",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "₦337k - ₦514k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 41,
    "initials": "FL",
    "title": "Junior Security Engineer",
    "company": "Fluxpay",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "$509k - $683k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 42,
    "initials": "CR",
    "title": "Lead Product Manager",
    "company": "Craftworks",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "₦851k - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 43,
    "initials": "JB",
    "title": "Junior Marketing Analyst",
    "company": "Jubilee Bank",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "R106k - R171k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 44,
    "initials": "WR",
    "title": "Lead Content Strategist",
    "company": "Westgate Retail",
    "location": "Abuja, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Content",
    "salaryText": "₦1.3m - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 45,
    "initials": "IV",
    "title": "Senior Product Owner",
    "company": "Ivorytech",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "₦358k - ₦547k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 46,
    "initials": "PA",
    "title": "Mid-level QA Lead",
    "company": "Parcelnow",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "R332k - R616k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 47,
    "initials": "BF",
    "title": "Junior Product Manager",
    "company": "Bramwell Foods",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦143k - ₦230k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 48,
    "initials": "BR",
    "title": "Mid-level Sales Development Representative",
    "company": "Brightloop",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦139k - ₦238k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 49,
    "initials": "CS",
    "title": "Mid-level QA Lead",
    "company": "Cove Studio",
    "location": "Remote (Africa)",
    "type": "Contract",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "$291k - $444k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 50,
    "initials": "WL",
    "title": "Junior Editor",
    "company": "Whitfield Legal",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "RF136k - RF261k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 51,
    "initials": "PC",
    "title": "Product Owner",
    "company": "Prosper Credit",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦217k - ₦319k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 52,
    "initials": "CS",
    "title": "DevOps Engineer",
    "company": "Cobalt Systems",
    "location": "Remote (Global)",
    "type": "Full-time",
    "level": "On-site",
    "category": "DevOps",
    "salaryText": "$130k - $258k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 53,
    "initials": "KD",
    "title": "Head of Product",
    "company": "Kaleido Design",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "₦324k - ₦453k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 54,
    "initials": "SA",
    "title": "Principal Business Development Manager",
    "company": "Sablewood",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦435k - ₦552k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 55,
    "initials": "GM",
    "title": "Principal Social Media Manager",
    "company": "Glowmark Media",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Marketing",
    "salaryText": "₦1.1m - ₦1.3m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 56,
    "initials": "DF",
    "title": "Lead Cybersecurity Analyst",
    "company": "Dockside Freight",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦418k - ₦548k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 57,
    "initials": "YT",
    "title": "Senior Account Manager",
    "company": "Yonder Travel",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "R526k - R786k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 58,
    "initials": "FL",
    "title": "Junior Content Writer",
    "company": "Fluxpay",
    "location": "London, UK",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "£110k - £223k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 59,
    "initials": "LH",
    "title": "Senior People Operations Lead",
    "company": "Lumen Health",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "On-site",
    "category": "Human Resources",
    "salaryText": "GH₵528k - GH₵698k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 60,
    "initials": "BL",
    "title": "Senior Systems Administrator",
    "company": "Bluepeak",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "₦390k - ₦536k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 61,
    "initials": "ZT",
    "title": "QA Lead",
    "company": "Zephyr Travel",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "RF254k - RF379k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 62,
    "initials": "JA",
    "title": "Junior Systems Administrator",
    "company": "Jetstream Air",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "GH₵210k - GH₵293k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 63,
    "initials": "RS",
    "title": "Lead Treasury Analyst",
    "company": "Redwing Systems",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "₦1.3m - ₦2.2m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 64,
    "initials": "BA",
    "title": "Senior Treasury Analyst",
    "company": "Basecamp Africa",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "$402k - $527k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 65,
    "initials": "BR",
    "title": "Junior Associate Product Manager",
    "company": "Brightloop",
    "location": "London, UK",
    "type": "Internship",
    "level": "Remote",
    "category": "Product",
    "salaryText": "£100k - £216k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 66,
    "initials": "VH",
    "title": "Mid-level Customer Support Specialist",
    "company": "Vireo Health",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦170k - ₦278k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 67,
    "initials": "BF",
    "title": "Senior Support Team Lead",
    "company": "Bramwell Foods",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "R332k - R474k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 68,
    "initials": "LA",
    "title": "Junior Product Manager",
    "company": "Longview Analytics",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "₦104k - ₦248k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 69,
    "initials": "FG",
    "title": "Interaction Designer",
    "company": "Freshline Grocers",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "On-site",
    "category": "Design",
    "salaryText": "GH₵381k - GH₵616k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 70,
    "initials": "KD",
    "title": "Senior Social Media Manager",
    "company": "Kaleido Design",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Marketing",
    "salaryText": "£520k - £812k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 71,
    "initials": "WR",
    "title": "Lead Operations Manager",
    "company": "Westgate Retail",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "RF1.1m - RF1.8m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 72,
    "initials": "VH",
    "title": "Lead Performance Marketing Lead",
    "company": "Vireo Health",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "$1.3m - $2m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 73,
    "initials": "SA",
    "title": "Junior Manual Tester",
    "company": "Sablewood",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "£216k - £362k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 74,
    "initials": "GF",
    "title": "Mid-level HR Business Partner",
    "company": "Grainery Foods",
    "location": "Nairobi, Kenya",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "KSh541k - KSh771k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 75,
    "initials": "HI",
    "title": "Senior DevOps Engineer",
    "company": "Hearthstone Insure",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦354k - ₦573k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 76,
    "initials": "PA",
    "title": "Solutions Architect",
    "company": "Palmly",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "₦268k - ₦524k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 77,
    "initials": "SU",
    "title": "Principal SEO Specialist",
    "company": "Suretrust",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "₦1.3m - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 78,
    "initials": "PA",
    "title": "Mid-level Data Engineer",
    "company": "Parcelnow",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "₦169k - ₦279k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 79,
    "initials": "HA",
    "title": "Lead Chief of Staff",
    "company": "Havenly",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote",
    "category": "Operations",
    "salaryText": "£1.2m - £1.4m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 80,
    "initials": "LH",
    "title": "Senior DevOps Engineer",
    "company": "Lumen Health",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "RF1.4m - RF1.7m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 81,
    "initials": "UR",
    "title": "Lead Technical Support Engineer",
    "company": "Urbanest",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦876k - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 82,
    "initials": "GF",
    "title": "Lead Legal Counsel",
    "company": "Grainery Foods",
    "location": "Remote (Global)",
    "type": "Internship",
    "level": "Remote",
    "category": "Legal",
    "salaryText": "$447k - $598k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 83,
    "initials": "CR",
    "title": "Junior Full-Stack Developer",
    "company": "Craftworks",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦187k - ₦324k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 84,
    "initials": "YT",
    "title": "DevOps Engineer",
    "company": "Yonder Travel",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "On-site",
    "category": "DevOps",
    "salaryText": "R190k - R299k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 85,
    "initials": "HM",
    "title": "Senior Product Manager",
    "company": "Highline Media",
    "location": "Kano, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦348k - ₦462k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 86,
    "initials": "BL",
    "title": "Junior Logistics Coordinator",
    "company": "Bluepeak",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "₦508k - ₦617k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 87,
    "initials": "BI",
    "title": "Junior Copywriter",
    "company": "Beacon Insure",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Remote",
    "category": "Content",
    "salaryText": "R194k - R319k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 88,
    "initials": "LE",
    "title": "Support Team Lead",
    "company": "Lumos Education",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "KSh130k - KSh185k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 89,
    "initials": "KU",
    "title": "Mid-level Legal Counsel",
    "company": "Kudabay",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Legal",
    "salaryText": "₦503k - ₦653k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 90,
    "initials": "RO",
    "title": "Mid-level Solutions Architect",
    "company": "Rootcode",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "₦527k - ₦719k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 91,
    "initials": "JB",
    "title": "Senior Analytics Manager",
    "company": "Jubilee Bank",
    "location": "Abuja, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Data",
    "salaryText": "₦347k - ₦605k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 92,
    "initials": "PA",
    "title": "Marketing Analyst",
    "company": "Parcelnow",
    "location": "Kigali, Rwanda",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Marketing",
    "salaryText": "RF121k - RF177k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 93,
    "initials": "JB",
    "title": "Senior Performance Marketing Lead",
    "company": "Jubilee Bank",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "R459k - R621k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 94,
    "initials": "MF",
    "title": "Principal BI Analyst",
    "company": "Mainstay Finance",
    "location": "Johannesburg, South Africa",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "R1.3m - R2.1m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 95,
    "initials": "WL",
    "title": "Content Strategist",
    "company": "Whitfield Legal",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "On-site",
    "category": "Content",
    "salaryText": "GH₵192k - GH₵248k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 96,
    "initials": "EM",
    "title": "QA Engineer",
    "company": "Emberly",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "$466k - $742k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 97,
    "initials": "XM",
    "title": "Mid-level Illustrator",
    "company": "Xylo Media",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "£140k - £273k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 98,
    "initials": "ZL",
    "title": "Principal Content Strategist",
    "company": "Ziplane Logistics",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "$1.4m - $2.2m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 99,
    "initials": "FA",
    "title": "Lead HR Business Partner",
    "company": "Farmly",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "RF1.1m - RF1.8m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 100,
    "initials": "SU",
    "title": "Lead Manual Tester",
    "company": "Suretrust",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "₦1.2m - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 101,
    "initials": "LH",
    "title": "QA Automation Engineer",
    "company": "Lattice HR",
    "location": "Johannesburg, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "R339k - R637k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 102,
    "initials": "ZE",
    "title": "Lead Information Security Manager",
    "company": "Zenlogix",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "£502k - £704k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 103,
    "initials": "SH",
    "title": "Senior HR Business Partner",
    "company": "Solace Health",
    "location": "Remote (Nigeria)",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦907k - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 104,
    "initials": "ZE",
    "title": "Technical Writer",
    "company": "Zenlogix",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "₦145k - ₦202k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 105,
    "initials": "BA",
    "title": "Supply Chain Analyst",
    "company": "Basecamp Africa",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Operations",
    "salaryText": "R94k - R218k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 106,
    "initials": "HM",
    "title": "Mid-level Technical Writer",
    "company": "Highline Media",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Content",
    "salaryText": "₦468k - ₦582k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 107,
    "initials": "MF",
    "title": "Lead DevOps Engineer",
    "company": "Momentum Fitness",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "R254k - R490k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 108,
    "initials": "FT",
    "title": "DevOps Engineer",
    "company": "Foundry Tech",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "$536k - $640k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 109,
    "initials": "GF",
    "title": "Principal QA Engineer",
    "company": "Grainery Foods",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "₦1.1m - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 110,
    "initials": "NA",
    "title": "Senior DevOps Engineer",
    "company": "Naijacart",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "$410k - $589k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 111,
    "initials": "DF",
    "title": "Senior Customer Success Manager",
    "company": "Dockside Freight",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "₦1.4m - ₦2.2m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 112,
    "initials": "FT",
    "title": "Mid-level People Operations Lead",
    "company": "Foundry Tech",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦400k - ₦668k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 113,
    "initials": "WR",
    "title": "Junior SEO Specialist",
    "company": "Westgate Retail",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "£165k - £295k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 114,
    "initials": "YT",
    "title": "Lead Sales Operations Analyst",
    "company": "Yonder Travel",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "R1.2m - R1.5m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 115,
    "initials": "EH",
    "title": "Principal Supply Chain Analyst",
    "company": "Elevate HR",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "R704k - R1.3m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 116,
    "initials": "QU",
    "title": "HR Business Partner",
    "company": "Quantalink",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦195k - ₦293k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 117,
    "initials": "PA",
    "title": "Senior Support Team Lead",
    "company": "Parcelnow",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "₦493k - ₦597k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 118,
    "initials": "FA",
    "title": "Lead Solutions Architect",
    "company": "Fablework",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦1.2m - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 119,
    "initials": "LH",
    "title": "Lead HR Manager",
    "company": "Lattice HR",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "On-site",
    "category": "Human Resources",
    "salaryText": "₦475k - ₦580k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 120,
    "initials": "FL",
    "title": "Mid-level Penetration Tester",
    "company": "Fluxpay",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Remote",
    "category": "Security",
    "salaryText": "$494k - $664k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 121,
    "initials": "VA",
    "title": "Mid-level UI/UX Designer",
    "company": "Vantage Africa",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "On-site",
    "category": "Design",
    "salaryText": "KSh304k - KSh514k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 122,
    "initials": "LA",
    "title": "Principal Manual Tester",
    "company": "Longview Analytics",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "GH₵545k - GH₵647k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 123,
    "initials": "VF",
    "title": "Principal Embedded Systems Engineer",
    "company": "Verdant Farms",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Engineering",
    "salaryText": "R921k - R1.6m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 124,
    "initials": "GM",
    "title": "Senior Manual Tester",
    "company": "Glowmark Media",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "$710k - $912k / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 125,
    "initials": "OV",
    "title": "Junior QA Lead",
    "company": "Outset Ventures",
    "location": "Remote (Africa)",
    "type": "Contract",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "$94k - $146k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 126,
    "initials": "BR",
    "title": "Lead Customer Success Manager",
    "company": "Brightloop",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦520k - ₦720k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 127,
    "initials": "HA",
    "title": "Sales Executive",
    "company": "Harborlight",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "KSh191k - KSh261k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 128,
    "initials": "MC",
    "title": "Growth Marketer",
    "company": "Marketplace Co",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "On-site",
    "category": "Marketing",
    "salaryText": "$177k - $291k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 129,
    "initials": "PA",
    "title": "Junior Systems Administrator",
    "company": "Parcelnow",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦100k - ₦199k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 130,
    "initials": "CL",
    "title": "Legal Counsel",
    "company": "Circuitry Labs",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "₦93k - ₦217k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 131,
    "initials": "CS",
    "title": "Junior Customer Success Manager",
    "company": "Cobalt Systems",
    "location": "Lagos, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦127k - ₦222k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 132,
    "initials": "MC",
    "title": "Mid-level Learning & Development Manager",
    "company": "Marketplace Co",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦442k - ₦581k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 133,
    "initials": "TF",
    "title": "Mid-level Site Reliability Engineer",
    "company": "Trove Finance",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "GH₵401k - GH₵538k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 134,
    "initials": "LA",
    "title": "Bookkeeper",
    "company": "Longview Analytics",
    "location": "Remote (Nigeria)",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Finance",
    "salaryText": "₦166k - ₦219k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 135,
    "initials": "PR",
    "title": "Mid-level Operations Analyst",
    "company": "Pinnacle Retail",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "₦540k - ₦682k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 136,
    "initials": "CS",
    "title": "Senior Associate Product Manager",
    "company": "Cobalt Systems",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "On-site",
    "category": "Product",
    "salaryText": "$432k - $559k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 137,
    "initials": "FT",
    "title": "Mid-level Sales Development Representative",
    "company": "Foundry Tech",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "₦96k - ₦245k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 138,
    "initials": "CS",
    "title": "Principal Cybersecurity Analyst",
    "company": "Cove Studio",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "$1.2m - $1.5m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 139,
    "initials": "HM",
    "title": "Junior Controller",
    "company": "Highline Media",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "$545k - $677k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 140,
    "initials": "UA",
    "title": "Lead Information Security Manager",
    "company": "Upstart Africa",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦993k - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 141,
    "initials": "HI",
    "title": "Lead Learning & Development Manager",
    "company": "Hearthstone Insure",
    "location": "Accra, Ghana",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "GH₵382k - GH₵577k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 142,
    "initials": "MF",
    "title": "Principal Penetration Tester",
    "company": "Momentum Fitness",
    "location": "Kano, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦316k - ₦587k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 143,
    "initials": "KD",
    "title": "Senior Release Manager",
    "company": "Kaleido Design",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦282k - ₦438k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 144,
    "initials": "WL",
    "title": "Junior Associate Product Manager",
    "company": "Whitfield Legal",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "GH₵187k - GH₵327k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 145,
    "initials": "CL",
    "title": "Customer Support Specialist",
    "company": "Circuitry Labs",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "R520k - R779k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 146,
    "initials": "KB",
    "title": "Mid-level Talent Acquisition Specialist",
    "company": "Keystone Bank",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "£481k - £742k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 147,
    "initials": "VH",
    "title": "Graphic Designer",
    "company": "Vireo Health",
    "location": "Accra, Ghana",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "GH₵323k - GH₵614k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 148,
    "initials": "FT",
    "title": "Senior Editor",
    "company": "Foundry Tech",
    "location": "Enugu, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Content",
    "salaryText": "₦431k - ₦643k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 149,
    "initials": "KL",
    "title": "Junior Systems Administrator",
    "company": "Kinetic Labs",
    "location": "Ibadan, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦218k - ₦269k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 150,
    "initials": "CE",
    "title": "Lead QA Automation Engineer",
    "company": "Cedarline",
    "location": "Remote (Global)",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "$392k - $538k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 151,
    "initials": "IC",
    "title": "Lead Solutions Architect",
    "company": "Ivory Consulting",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦525k - ₦774k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 152,
    "initials": "MF",
    "title": "Platform Engineer",
    "company": "Momentum Fitness",
    "location": "Remote (Global)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "$349k - $550k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 153,
    "initials": "GL",
    "title": "Sales Executive",
    "company": "Gridiron Logistics",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "GH₵84k - GH₵165k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 154,
    "initials": "BA",
    "title": "Mid-level Product Owner",
    "company": "Basecamp Africa",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "R139k - R282k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 155,
    "initials": "TF",
    "title": "Manual Tester",
    "company": "Trove Finance",
    "location": "Enugu, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "₦136k - ₦272k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 156,
    "initials": "SE",
    "title": "Mid-level DevOps Engineer",
    "company": "Solaris Energy",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "RF152k - RF280k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 157,
    "initials": "WR",
    "title": "Principal Recruiter",
    "company": "Westgate Retail",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦1.2m - ₦1.9m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 158,
    "initials": "YC",
    "title": "Mid-level Penetration Tester",
    "company": "Yield Capital",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦482k - ₦711k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 159,
    "initials": "LA",
    "title": "Mid-level Solutions Architect",
    "company": "Longview Analytics",
    "location": "Kano, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦148k - ₦219k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 160,
    "initials": "WL",
    "title": "Principal Cybersecurity Analyst",
    "company": "Whitfield Legal",
    "location": "London, UK",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "£939k - £1.6m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 161,
    "initials": "VA",
    "title": "Lead Content Strategist",
    "company": "Vantage Africa",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Content",
    "salaryText": "₦722k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 162,
    "initials": "OR",
    "title": "Senior Talent Acquisition Specialist",
    "company": "Orbitals",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "RF412k - RF553k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 163,
    "initials": "KU",
    "title": "Content Marketing Manager",
    "company": "Kudabay",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "R210k - R289k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 164,
    "initials": "PC",
    "title": "Lead QA Engineer",
    "company": "Prosper Credit",
    "location": "Johannesburg, South Africa",
    "type": "Internship",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "R478k - R755k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 165,
    "initials": "FL",
    "title": "Lead Software Engineer",
    "company": "Fluxpay",
    "location": "Nairobi, Kenya",
    "type": "Full-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "KSh327k - KSh494k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 166,
    "initials": "MF",
    "title": "Principal Legal Counsel",
    "company": "Mainstay Finance",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Remote",
    "category": "Legal",
    "salaryText": "GH₵721k - GH₵1.1m / month",
    "salaryRank": "high",
    "posted": "1 month"
  },
  {
    "id": 167,
    "initials": "CS",
    "title": "Motion Designer",
    "company": "Cobalt Systems",
    "location": "Kano, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Design",
    "salaryText": "₦156k - ₦256k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 168,
    "initials": "AR",
    "title": "Junior Design Lead",
    "company": "Amberly Retail",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Design",
    "salaryText": "₦111k - ₦179k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 169,
    "initials": "SA",
    "title": "Sales Operations Analyst",
    "company": "Sablewood",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "$114k - $186k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 170,
    "initials": "SH",
    "title": "HR Business Partner",
    "company": "Solace Health",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "RF215k - RF355k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 171,
    "initials": "KD",
    "title": "Lead Motion Designer",
    "company": "Kaleido Design",
    "location": "Remote (Global)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Design",
    "salaryText": "$715k - $1.1m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 172,
    "initials": "HI",
    "title": "Software Engineer",
    "company": "Hearthstone Insure",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦101k - ₦215k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 173,
    "initials": "IV",
    "title": "Senior Data Scientist",
    "company": "Ivorytech",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "GH₵430k - GH₵659k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 174,
    "initials": "ML",
    "title": "Lead HR Business Partner",
    "company": "Meridian Labs",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "R864k - R1.3m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 175,
    "initials": "EV",
    "title": "Mid-level Content Marketing Manager",
    "company": "Everstream",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "On-site",
    "category": "Content",
    "salaryText": "R351k - R478k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 176,
    "initials": "OL",
    "title": "Principal Cloud Infrastructure Engineer",
    "company": "Origin Logistics",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦729k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 177,
    "initials": "IV",
    "title": "Analytics Manager",
    "company": "Ivorytech",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "Remote",
    "category": "Data",
    "salaryText": "₦142k - ₦280k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 178,
    "initials": "ML",
    "title": "Principal DevOps Engineer",
    "company": "Meridian Labs",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦364k - ₦524k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 179,
    "initials": "TF",
    "title": "Principal Help Desk Analyst",
    "company": "Trove Finance",
    "location": "Ibadan, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦1.3m - ₦1.9m / month",
    "salaryRank": "high",
    "posted": "12 hours"
  },
  {
    "id": 180,
    "initials": "LA",
    "title": "Principal Backend Engineer",
    "company": "Longview Analytics",
    "location": "London, UK",
    "type": "Internship",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "£320k - £507k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 181,
    "initials": "BL",
    "title": "QA Lead",
    "company": "Bluepeak",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "R201k - R322k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 182,
    "initials": "MF",
    "title": "Solutions Architect",
    "company": "Momentum Fitness",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "GH₵174k - GH₵312k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 183,
    "initials": "VF",
    "title": "Junior Engineering Manager",
    "company": "Verdant Farms",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "R106k - R219k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 184,
    "initials": "PA",
    "title": "Junior Support Team Lead",
    "company": "Palmly",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "GH₵132k - GH₵278k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 185,
    "initials": "VH",
    "title": "Lead Associate Product Manager",
    "company": "Vireo Health",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦714k - ₦1.5m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 186,
    "initials": "GR",
    "title": "Senior Embedded Systems Engineer",
    "company": "Greenpay",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "$518k - $627k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 187,
    "initials": "VH",
    "title": "Junior Head of Finance",
    "company": "Vireo Health",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "₦398k - ₦620k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 188,
    "initials": "ZE",
    "title": "Principal Product Owner",
    "company": "Zenlogix",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "GH₵403k - GH₵541k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 189,
    "initials": "OL",
    "title": "Junior Talent Acquisition Specialist",
    "company": "Origin Logistics",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦210k - ₦287k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 190,
    "initials": "NC",
    "title": "Lead Manual Tester",
    "company": "Nimbus Cloud",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "₦1.3m - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 191,
    "initials": "EV",
    "title": "Principal Systems Administrator",
    "company": "Everstream",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "GH₵465k - GH₵634k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 192,
    "initials": "JB",
    "title": "Financial Analyst",
    "company": "Jubilee Bank",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "₦203k - ₦341k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 193,
    "initials": "EV",
    "title": "Systems Administrator",
    "company": "Everstream",
    "location": "London, UK",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "£205k - £305k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 194,
    "initials": "UA",
    "title": "Mid-level People Operations Lead",
    "company": "Upstart Africa",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "£112k - £257k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 195,
    "initials": "YT",
    "title": "Senior Editor",
    "company": "Yonder Travel",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "Remote",
    "category": "Content",
    "salaryText": "R924k - R1.4m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 196,
    "initials": "IC",
    "title": "Principal Recruiter",
    "company": "Ivory Consulting",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "₦934k - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 197,
    "initials": "LH",
    "title": "Principal Sales Operations Analyst",
    "company": "Lumen Health",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦1.1m - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 198,
    "initials": "NO",
    "title": "Junior Analytics Manager",
    "company": "Novapay",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "$505k - $721k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 199,
    "initials": "NA",
    "title": "Principal Penetration Tester",
    "company": "Naijacart",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "₦1.2m - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 200,
    "initials": "CR",
    "title": "Performance Marketing Lead",
    "company": "Craftworks",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Marketing",
    "salaryText": "₦149k - ₦279k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 201,
    "initials": "EM",
    "title": "Lead UI/UX Designer",
    "company": "Emberly",
    "location": "Nairobi, Kenya",
    "type": "Freelance",
    "level": "Remote",
    "category": "Design",
    "salaryText": "KSh727k - KSh1.5m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 202,
    "initials": "OL",
    "title": "Mid-level Sales Development Representative",
    "company": "Origin Logistics",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "₦441k - ₦646k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 203,
    "initials": "UA",
    "title": "Senior Growth Product Manager",
    "company": "Upstart Africa",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "₦375k - ₦518k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 204,
    "initials": "VA",
    "title": "Lead Embedded Systems Engineer",
    "company": "Vantage Africa",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "₦1m - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 205,
    "initials": "QU",
    "title": "Mid-level Finance Manager",
    "company": "Quantalink",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "$447k - $731k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 206,
    "initials": "SE",
    "title": "Lead Customer Support Specialist",
    "company": "Solaris Energy",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "₦1.4m - ₦1.9m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 207,
    "initials": "IC",
    "title": "Lead Performance Marketing Lead",
    "company": "Ivory Consulting",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "GH₵1.2m - GH₵1.5m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 208,
    "initials": "IC",
    "title": "Junior Contracts Manager",
    "company": "Ivory Consulting",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "KSh132k - KSh263k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 209,
    "initials": "OL",
    "title": "Junior Product Owner",
    "company": "Origin Logistics",
    "location": "Kano, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "₦185k - ₦332k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 210,
    "initials": "JM",
    "title": "Junior Cybersecurity Analyst",
    "company": "Junction Mobility",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "On-site",
    "category": "Security",
    "salaryText": "$379k - $538k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 211,
    "initials": "XM",
    "title": "Mid-level DevOps Engineer",
    "company": "Xylo Media",
    "location": "Remote (Global)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "$357k - $613k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 212,
    "initials": "BI",
    "title": "Principal Financial Analyst",
    "company": "Beacon Insure",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Finance",
    "salaryText": "GH₵349k - GH₵542k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 213,
    "initials": "FA",
    "title": "Principal Penetration Tester",
    "company": "Fablework",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦779k - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 214,
    "initials": "WR",
    "title": "Lead Controller",
    "company": "Westgate Retail",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "R844k - R1.3m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 215,
    "initials": "ZE",
    "title": "Principal QA Lead",
    "company": "Zenlogix",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "₦340k - ₦538k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 216,
    "initials": "TF",
    "title": "Mid-level Contracts Manager",
    "company": "Timberline Foods",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote",
    "category": "Legal",
    "salaryText": "£363k - £592k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 217,
    "initials": "HI",
    "title": "Senior QA Engineer",
    "company": "Hearthstone Insure",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "₦1m - ₦1.5m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 218,
    "initials": "CO",
    "title": "Junior Business Development Manager",
    "company": "Coralwave",
    "location": "London, UK",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "£321k - £546k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 219,
    "initials": "RS",
    "title": "Junior QA Engineer",
    "company": "Redwing Systems",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "₦491k - ₦787k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 220,
    "initials": "FT",
    "title": "Senior Product Designer",
    "company": "Foundry Tech",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦494k - ₦596k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 221,
    "initials": "KU",
    "title": "Backend Engineer",
    "company": "Kudabay",
    "location": "Abuja, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "₦182k - ₦277k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 222,
    "initials": "BR",
    "title": "Principal Design Systems Lead",
    "company": "Brightloop",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "GH₵1.4m - GH₵2m / month",
    "salaryRank": "high",
    "posted": "12 hours"
  },
  {
    "id": 223,
    "initials": "EM",
    "title": "Mid-level Enterprise Sales Rep",
    "company": "Emberly",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦471k - ₦599k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 224,
    "initials": "GF",
    "title": "Mid-level Penetration Tester",
    "company": "Grainery Foods",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "On-site",
    "category": "Security",
    "salaryText": "RF356k - RF566k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 225,
    "initials": "PC",
    "title": "Legal Counsel",
    "company": "Prosper Credit",
    "location": "Johannesburg, South Africa",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "R148k - R288k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 226,
    "initials": "RO",
    "title": "Lead Controller",
    "company": "Rootcode",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "₦506k - ₦659k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 227,
    "initials": "ND",
    "title": "Senior Bookkeeper",
    "company": "Nettle Design",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "₦1.2m - ₦1.7m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 228,
    "initials": "EM",
    "title": "Mid-level Project Coordinator",
    "company": "Emberly",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Operations",
    "salaryText": "KSh207k - KSh321k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 229,
    "initials": "IC",
    "title": "Lead Regulatory Affairs Specialist",
    "company": "Ivory Consulting",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "$1.2m - $2.1m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 230,
    "initials": "MF",
    "title": "Junior Design Systems Lead",
    "company": "Mainstay Finance",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦129k - ₦270k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 231,
    "initials": "FT",
    "title": "Junior Graphic Designer",
    "company": "Foundry Tech",
    "location": "Johannesburg, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "R196k - R281k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 232,
    "initials": "CE",
    "title": "Mid-level Information Security Manager",
    "company": "Cedarline",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "RF220k - RF355k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 233,
    "initials": "CL",
    "title": "Principal Data Scientist",
    "company": "Circuitry Labs",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Data",
    "salaryText": "$1.3m - $1.8m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 234,
    "initials": "RI",
    "title": "Mid-level QA Engineer",
    "company": "Riverstone",
    "location": "Johannesburg, South Africa",
    "type": "Contract",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "R195k - R307k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 235,
    "initials": "PA",
    "title": "Junior Editor",
    "company": "Parcelnow",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "$106k - $202k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 236,
    "initials": "WL",
    "title": "Marketing Manager",
    "company": "Whitfield Legal",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Marketing",
    "salaryText": "₦206k - ₦293k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 237,
    "initials": "VA",
    "title": "Senior HR Manager",
    "company": "Vantage Africa",
    "location": "Abuja, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦1m - ₦1.3m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 238,
    "initials": "JA",
    "title": "Lead Talent Acquisition Specialist",
    "company": "Jetstream Air",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "$1.3m - $1.8m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 239,
    "initials": "BR",
    "title": "Lead Penetration Tester",
    "company": "Brightloop",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Security",
    "salaryText": "$1.4m - $2m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 240,
    "initials": "NA",
    "title": "Principal Release Manager",
    "company": "Naijacart",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "R978k - R1.3m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 241,
    "initials": "CO",
    "title": "Mid-level Head of Product",
    "company": "Coralwave",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "R470k - R626k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 242,
    "initials": "JA",
    "title": "Social Media Manager",
    "company": "Jetstream Air",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "₦171k - ₦281k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 243,
    "initials": "OR",
    "title": "Mid-level Mobile Developer (Android)",
    "company": "Orbitals",
    "location": "Kigali, Rwanda",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "RF291k - RF507k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 244,
    "initials": "TE",
    "title": "Security Engineer",
    "company": "Terracore",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦115k - ₦229k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 245,
    "initials": "CS",
    "title": "Lead Customer Support Specialist",
    "company": "Cobalt Systems",
    "location": "Remote (Global)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "$1.1m - $2m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 246,
    "initials": "DF",
    "title": "Mid-level Information Security Manager",
    "company": "Dockside Freight",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "₦338k - ₦617k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 247,
    "initials": "BR",
    "title": "Help Desk Analyst",
    "company": "Brightloop",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "$86k - $144k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 248,
    "initials": "SU",
    "title": "Mid-level Talent Acquisition Specialist",
    "company": "Suretrust",
    "location": "Nairobi, Kenya",
    "type": "Full-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "KSh120k - KSh196k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 249,
    "initials": "KD",
    "title": "Senior Engineering Manager",
    "company": "Kaleido Design",
    "location": "Lagos, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "₦385k - ₦621k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 250,
    "initials": "BA",
    "title": "Customer Success Manager",
    "company": "Basecamp Africa",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "RF178k - RF247k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 251,
    "initials": "DS",
    "title": "Senior Manual Tester",
    "company": "Driftwood Studio",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "R368k - R487k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 252,
    "initials": "IL",
    "title": "Mid-level Design Systems Lead",
    "company": "Ironclad Legal",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "GH₵305k - GH₵508k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 253,
    "initials": "QU",
    "title": "Lead Customer Success Manager",
    "company": "Quantalink",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦489k - ₦699k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 254,
    "initials": "QU",
    "title": "Software Engineer",
    "company": "Quantalink",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "RF146k - RF199k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 255,
    "initials": "JA",
    "title": "Lead Sales Executive",
    "company": "Jetstream Air",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "$758k - $1.7m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 256,
    "initials": "FT",
    "title": "Lead Associate Product Manager",
    "company": "Foundry Tech",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "R525k - R772k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 257,
    "initials": "FA",
    "title": "Paralegal",
    "company": "Farmly",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Legal",
    "salaryText": "R94k - R211k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 258,
    "initials": "CL",
    "title": "Principal Support Team Lead",
    "company": "Circuitry Labs",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "RF1.2m - RF1.9m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 259,
    "initials": "UA",
    "title": "Mid-level QA Lead",
    "company": "Upstart Africa",
    "location": "London, UK",
    "type": "Internship",
    "level": "Remote",
    "category": "Quality Assurance",
    "salaryText": "£444k - £611k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 260,
    "initials": "DF",
    "title": "Senior Payroll Specialist",
    "company": "Delta Freight",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "R510k - R724k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 261,
    "initials": "GF",
    "title": "Senior BI Analyst",
    "company": "Grainery Foods",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "RF1.2m - RF1.5m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 262,
    "initials": "MF",
    "title": "Mid-level Analytics Manager",
    "company": "Momentum Fitness",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "R420k - R707k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 263,
    "initials": "TE",
    "title": "Lead Talent Acquisition Specialist",
    "company": "Terracore",
    "location": "Cape Town, South Africa",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "R356k - R523k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 264,
    "initials": "HM",
    "title": "Junior Financial Analyst",
    "company": "Highline Media",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "₦164k - ₦220k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 265,
    "initials": "TF",
    "title": "Junior Enterprise Sales Rep",
    "company": "Timberline Foods",
    "location": "London, UK",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "£329k - £452k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 266,
    "initials": "IL",
    "title": "Senior Embedded Systems Engineer",
    "company": "Ironclad Legal",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "$799k - $1.4m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 267,
    "initials": "VH",
    "title": "Lead Visual Designer",
    "company": "Vireo Health",
    "location": "Kano, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦1.4m - ₦2.2m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 268,
    "initials": "TE",
    "title": "Lead Motion Designer",
    "company": "Terracore",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote",
    "category": "Design",
    "salaryText": "R346k - R538k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 269,
    "initials": "MC",
    "title": "Mid-level Head of Sales",
    "company": "Marketplace Co",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Sales",
    "salaryText": "₦195k - ₦323k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 270,
    "initials": "KB",
    "title": "Mid-level Product Designer",
    "company": "Keystone Bank",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Design",
    "salaryText": "₦145k - ₦228k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 271,
    "initials": "CO",
    "title": "Junior Enterprise Sales Rep",
    "company": "Coralwave",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "$125k - $230k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 272,
    "initials": "KU",
    "title": "Lead QA Lead",
    "company": "Kudabay",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "₦539k - ₦762k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 273,
    "initials": "AA",
    "title": "Principal QA Lead",
    "company": "Anchor Analytics",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "GH₵1.1m - GH₵1.9m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 274,
    "initials": "OL",
    "title": "Senior Talent Acquisition Specialist",
    "company": "Origin Logistics",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦1.3m - ₦2.2m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 275,
    "initials": "BR",
    "title": "Mid-level Analytics Manager",
    "company": "Brightloop",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Data",
    "salaryText": "₦102k - ₦217k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 276,
    "initials": "GL",
    "title": "Lead Social Media Manager",
    "company": "Gridiron Logistics",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "RF1.4m - RF1.7m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 277,
    "initials": "MF",
    "title": "HR Manager",
    "company": "Momentum Fitness",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦147k - ₦228k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 278,
    "initials": "TF",
    "title": "Principal Operations Analyst",
    "company": "Trove Finance",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Operations",
    "salaryText": "₦1.4m - ₦1.9m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 279,
    "initials": "FA",
    "title": "Lead Recruiter",
    "company": "Farmly",
    "location": "Cape Town, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "R309k - R549k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 280,
    "initials": "CS",
    "title": "Senior Cloud Infrastructure Engineer",
    "company": "Cove Studio",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "$491k - $620k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 281,
    "initials": "QU",
    "title": "Lead People Operations Lead",
    "company": "Quillmark",
    "location": "Abuja, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦736k - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 282,
    "initials": "QU",
    "title": "Junior Talent Acquisition Specialist",
    "company": "Quillmark",
    "location": "Kigali, Rwanda",
    "type": "Internship",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "RF196k - RF261k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 283,
    "initials": "IC",
    "title": "Mid-level QA Automation Engineer",
    "company": "Ivory Consulting",
    "location": "Nairobi, Kenya",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "KSh370k - KSh482k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 284,
    "initials": "OR",
    "title": "Senior Operations Manager",
    "company": "Orbitals",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Operations",
    "salaryText": "₦1.3m - ₦2m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 285,
    "initials": "LA",
    "title": "Principal QA Lead",
    "company": "Longview Analytics",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "R386k - R501k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 286,
    "initials": "DF",
    "title": "Junior Analytics Manager",
    "company": "Delta Freight",
    "location": "Nairobi, Kenya",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Data",
    "salaryText": "KSh201k - KSh315k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 287,
    "initials": "WL",
    "title": "Learning & Development Manager",
    "company": "Whitfield Legal",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "RF102k - RF189k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 288,
    "initials": "NO",
    "title": "Junior Penetration Tester",
    "company": "Novapay",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "£172k - £227k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 289,
    "initials": "IN",
    "title": "Lead QA Engineer",
    "company": "Innoware",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "₦1.2m - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 290,
    "initials": "SA",
    "title": "Senior Talent Acquisition Specialist",
    "company": "Sablewood",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦361k - ₦483k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 291,
    "initials": "JM",
    "title": "Principal Machine Learning Engineer",
    "company": "Junction Mobility",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Data",
    "salaryText": "₦721k - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 292,
    "initials": "KU",
    "title": "Mid-level Security Engineer",
    "company": "Kudabay",
    "location": "Johannesburg, South Africa",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "R456k - R581k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 293,
    "initials": "FI",
    "title": "Lead UI/UX Designer",
    "company": "Finotech",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "R798k - R1.4m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 294,
    "initials": "CR",
    "title": "Senior Systems Administrator",
    "company": "Craftworks",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "R295k - R495k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 295,
    "initials": "IV",
    "title": "Principal Marketing Manager",
    "company": "Ivorytech",
    "location": "Lagos, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "₦856k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 296,
    "initials": "JB",
    "title": "Junior Supply Chain Analyst",
    "company": "Jubilee Bank",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Operations",
    "salaryText": "₦263k - ₦414k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 297,
    "initials": "FG",
    "title": "Lead Content Marketing Manager",
    "company": "Freshline Grocers",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote",
    "category": "Content",
    "salaryText": "GH₵430k - GH₵557k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 298,
    "initials": "SU",
    "title": "Senior Product Manager",
    "company": "Suretrust",
    "location": "Lagos, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "₦536k - ₦690k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 299,
    "initials": "HI",
    "title": "Lead Support Team Lead",
    "company": "Hearthstone Insure",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "R451k - R717k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 300,
    "initials": "BL",
    "title": "Principal QA Engineer",
    "company": "Bluepeak",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "$1.4m - $1.7m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 301,
    "initials": "CL",
    "title": "Mid-level Chief of Staff",
    "company": "Circuitry Labs",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Operations",
    "salaryText": "₦386k - ₦671k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 302,
    "initials": "WR",
    "title": "Senior Site Reliability Engineer",
    "company": "Westgate Retail",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "₦429k - ₦697k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 303,
    "initials": "HM",
    "title": "Principal Compliance Officer",
    "company": "Highline Media",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "RF1.3m - RF1.6m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 304,
    "initials": "NA",
    "title": "Lead Legal Counsel",
    "company": "Naijacart",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "₦344k - ₦592k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 305,
    "initials": "CR",
    "title": "Senior Systems Administrator",
    "company": "Craftworks",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "₦989k - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 306,
    "initials": "JA",
    "title": "Principal Release Manager",
    "company": "Jetstream Air",
    "location": "Kano, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦1.2m - ₦1.9m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 307,
    "initials": "ML",
    "title": "Data Scientist",
    "company": "Meridian Labs",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "R96k - R176k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 308,
    "initials": "BF",
    "title": "Junior Brand Manager",
    "company": "Bramwell Foods",
    "location": "Cape Town, South Africa",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "R178k - R280k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 309,
    "initials": "LE",
    "title": "Principal Site Reliability Engineer",
    "company": "Lumos Education",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦364k - ₦540k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 310,
    "initials": "ND",
    "title": "Marketing Manager",
    "company": "Nettle Design",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Marketing",
    "salaryText": "₦384k - ₦523k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 311,
    "initials": "TF",
    "title": "Principal Customer Support Specialist",
    "company": "Timberline Foods",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦724k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 312,
    "initials": "EH",
    "title": "Mid-level Sales Operations Analyst",
    "company": "Elevate HR",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "KSh320k - KSh577k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 313,
    "initials": "JA",
    "title": "Mid-level Regulatory Affairs Specialist",
    "company": "Jetstream Air",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Legal",
    "salaryText": "₦516k - ₦617k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 314,
    "initials": "GL",
    "title": "Senior BI Analyst",
    "company": "Gridiron Logistics",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦252k - ₦548k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 315,
    "initials": "AA",
    "title": "Lead Systems Administrator",
    "company": "Anchor Analytics",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦527k - ₦725k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 316,
    "initials": "ND",
    "title": "Lead Data Engineer",
    "company": "Nettle Design",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦711k - ₦1.1m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 317,
    "initials": "GR",
    "title": "Senior Controller",
    "company": "Greenpay",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "₦311k - ₦601k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 318,
    "initials": "CR",
    "title": "Lead UI/UX Designer",
    "company": "Craftworks",
    "location": "Abuja, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "₦715k - ₦973k / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 319,
    "initials": "BI",
    "title": "Mid-level Cybersecurity Analyst",
    "company": "Beacon Insure",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Security",
    "salaryText": "$377k - $618k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 320,
    "initials": "VH",
    "title": "Senior Motion Designer",
    "company": "Vireo Health",
    "location": "Nairobi, Kenya",
    "type": "Internship",
    "level": "On-site",
    "category": "Design",
    "salaryText": "KSh840k - KSh1.6m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 321,
    "initials": "IN",
    "title": "Lead Treasury Analyst",
    "company": "Innoware",
    "location": "London, UK",
    "type": "Freelance",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "£785k - £1.1m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 322,
    "initials": "MF",
    "title": "Security Engineer",
    "company": "Mainstay Finance",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦456k - ₦707k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 323,
    "initials": "MF",
    "title": "Information Security Manager",
    "company": "Mainstay Finance",
    "location": "Cape Town, South Africa",
    "type": "Freelance",
    "level": "On-site",
    "category": "Security",
    "salaryText": "R162k - R242k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 324,
    "initials": "SE",
    "title": "Senior Help Desk Analyst",
    "company": "Solaris Energy",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "£491k - £643k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 325,
    "initials": "WR",
    "title": "Junior QA Automation Engineer",
    "company": "Westgate Retail",
    "location": "Remote (Global)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "$135k - $190k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 326,
    "initials": "FA",
    "title": "Lead Editor",
    "company": "Farmly",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "RF532k - RF803k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 327,
    "initials": "FA",
    "title": "Principal Head of Product",
    "company": "Fablework",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote",
    "category": "Product",
    "salaryText": "£1.2m - £1.4m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 328,
    "initials": "GF",
    "title": "Lead BI Analyst",
    "company": "Grainery Foods",
    "location": "Enugu, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Data",
    "salaryText": "₦787k - ₦1.1m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 329,
    "initials": "SA",
    "title": "Information Security Manager",
    "company": "Sablewood",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "GH₵199k - GH₵258k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 330,
    "initials": "LH",
    "title": "Principal Legal Counsel",
    "company": "Lattice HR",
    "location": "Ibadan, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "₦321k - ₦619k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 331,
    "initials": "QU",
    "title": "Growth Product Manager",
    "company": "Quillmark",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "On-site",
    "category": "Product",
    "salaryText": "$390k - $636k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 332,
    "initials": "SE",
    "title": "Lead Marketing Analyst",
    "company": "Solaris Energy",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "GH₵1.3m - GH₵2m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 333,
    "initials": "CS",
    "title": "Senior Release Manager",
    "company": "Cobalt Systems",
    "location": "Remote (Africa)",
    "type": "Contract",
    "level": "On-site",
    "category": "DevOps",
    "salaryText": "$297k - $549k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 334,
    "initials": "DF",
    "title": "Senior Learning & Development Manager",
    "company": "Delta Freight",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦1.4m - ₦1.8m / month",
    "salaryRank": "high",
    "posted": "12 hours"
  },
  {
    "id": 335,
    "initials": "SU",
    "title": "Mid-level Mobile Developer (iOS)",
    "company": "Suretrust",
    "location": "Kano, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "₦446k - ₦744k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 336,
    "initials": "OR",
    "title": "Junior Illustrator",
    "company": "Orbitals",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Design",
    "salaryText": "₦220k - ₦363k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 337,
    "initials": "FA",
    "title": "Junior Payroll Specialist",
    "company": "Fablework",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "₦123k - ₦213k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 338,
    "initials": "OR",
    "title": "Mid-level Growth Product Manager",
    "company": "Orbitals",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "R466k - R727k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 339,
    "initials": "CL",
    "title": "Senior Design Systems Lead",
    "company": "Circuitry Labs",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Remote",
    "category": "Design",
    "salaryText": "RF349k - RF459k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 340,
    "initials": "CS",
    "title": "Junior Backend Engineer",
    "company": "Cove Studio",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "R217k - R336k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 341,
    "initials": "GR",
    "title": "Mid-level Design Systems Lead",
    "company": "Greenpay",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "On-site",
    "category": "Design",
    "salaryText": "$452k - $682k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 342,
    "initials": "GR",
    "title": "Junior Sales Executive",
    "company": "Greenpay",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "₦185k - ₦309k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 343,
    "initials": "YT",
    "title": "Mid-level Sales Operations Analyst",
    "company": "Yonder Travel",
    "location": "Abuja, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "₦425k - ₦670k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 344,
    "initials": "JA",
    "title": "Junior Email Marketing Specialist",
    "company": "Jetstream Air",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "RF93k - RF153k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 345,
    "initials": "SA",
    "title": "Lead Data Engineer",
    "company": "Sablewood",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Data",
    "salaryText": "₦498k - ₦710k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 346,
    "initials": "DF",
    "title": "Mid-level Customer Success Manager",
    "company": "Dockside Freight",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "R466k - R583k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 347,
    "initials": "VA",
    "title": "Payroll Specialist",
    "company": "Vantage Africa",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "On-site",
    "category": "Finance",
    "salaryText": "RF160k - RF285k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 348,
    "initials": "YT",
    "title": "Senior Visual Designer",
    "company": "Yonder Travel",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "On-site",
    "category": "Design",
    "salaryText": "$296k - $416k / month",
    "salaryRank": "medium",
    "posted": "2 months"
  },
  {
    "id": 349,
    "initials": "SU",
    "title": "Senior Logistics Coordinator",
    "company": "Suretrust",
    "location": "Kigali, Rwanda",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Operations",
    "salaryText": "RF539k - RF713k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 350,
    "initials": "SH",
    "title": "Principal Interaction Designer",
    "company": "Solace Health",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "GH₵456k - GH₵588k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 351,
    "initials": "GL",
    "title": "Mid-level Contracts Manager",
    "company": "Gridiron Logistics",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Remote",
    "category": "Legal",
    "salaryText": "GH₵124k - GH₵269k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 352,
    "initials": "YT",
    "title": "Senior Legal Counsel",
    "company": "Yonder Travel",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "$520k - $650k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 353,
    "initials": "KD",
    "title": "Content Writer",
    "company": "Kaleido Design",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Remote",
    "category": "Content",
    "salaryText": "R256k - R545k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 354,
    "initials": "UR",
    "title": "Lead Design Lead",
    "company": "Urbanest",
    "location": "Abuja, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Design",
    "salaryText": "₦516k - ₦752k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 355,
    "initials": "CL",
    "title": "Principal Legal Counsel",
    "company": "Circuitry Labs",
    "location": "Remote (Africa)",
    "type": "Contract",
    "level": "Remote",
    "category": "Legal",
    "salaryText": "$283k - $385k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 356,
    "initials": "MC",
    "title": "Email Marketing Specialist",
    "company": "Marketplace Co",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "R297k - R530k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 357,
    "initials": "KU",
    "title": "Mid-level Help Desk Analyst",
    "company": "Kudabay",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "R144k - R282k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 358,
    "initials": "RS",
    "title": "Mid-level Product Manager",
    "company": "Redwing Systems",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Product",
    "salaryText": "₦105k - ₦209k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 359,
    "initials": "MC",
    "title": "Lead Cybersecurity Analyst",
    "company": "Marketplace Co",
    "location": "Lagos, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦1.2m - ₦2m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 360,
    "initials": "OV",
    "title": "Lead QA Engineer",
    "company": "Outset Ventures",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "GH₵433k - GH₵559k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 361,
    "initials": "ZE",
    "title": "Senior Support Team Lead",
    "company": "Zenlogix",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦458k - ₦619k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 362,
    "initials": "VH",
    "title": "Senior Help Desk Analyst",
    "company": "Vireo Health",
    "location": "Johannesburg, South Africa",
    "type": "Contract",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "R302k - R454k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 363,
    "initials": "MC",
    "title": "Mid-level Help Desk Analyst",
    "company": "Marketplace Co",
    "location": "Ibadan, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦528k - ₦633k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 364,
    "initials": "GF",
    "title": "Principal Help Desk Analyst",
    "company": "Grainery Foods",
    "location": "London, UK",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "£861k - £1.7m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 365,
    "initials": "HA",
    "title": "HR Business Partner",
    "company": "Harborlight",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "$110k - $191k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 366,
    "initials": "FA",
    "title": "Head of Sales",
    "company": "Farmly",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "KSh547k - KSh674k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 367,
    "initials": "WA",
    "title": "Principal Content Writer",
    "company": "Wavecrest",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote",
    "category": "Content",
    "salaryText": "GH₵963k - GH₵1.8m / month",
    "salaryRank": "high",
    "posted": "1 day"
  },
  {
    "id": 368,
    "initials": "OL",
    "title": "Principal Regulatory Affairs Specialist",
    "company": "Origin Logistics",
    "location": "Enugu, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "₦981k - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 369,
    "initials": "NA",
    "title": "Operations Analyst",
    "company": "Naijacart",
    "location": "Remote (Global)",
    "type": "Freelance",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "$365k - $475k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 370,
    "initials": "MC",
    "title": "Junior Compliance Officer",
    "company": "Marketplace Co",
    "location": "Kigali, Rwanda",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Legal",
    "salaryText": "RF180k - RF325k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 371,
    "initials": "VF",
    "title": "Senior Payroll Specialist",
    "company": "Verdant Farms",
    "location": "Kigali, Rwanda",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Finance",
    "salaryText": "RF913k - RF1.7m / month",
    "salaryRank": "high",
    "posted": "1 month"
  },
  {
    "id": 372,
    "initials": "SA",
    "title": "Junior QA Engineer",
    "company": "Sablewood",
    "location": "Lagos, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "₦458k - ₦628k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 373,
    "initials": "NA",
    "title": "Lead Cybersecurity Analyst",
    "company": "Naijacart",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦499k - ₦707k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 374,
    "initials": "KU",
    "title": "Lead Performance Marketing Lead",
    "company": "Kudabay",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "GH₵403k - GH₵590k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 375,
    "initials": "ZE",
    "title": "Illustrator",
    "company": "Zenlogix",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦150k - ₦262k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 376,
    "initials": "FA",
    "title": "Senior Solutions Architect",
    "company": "Farmly",
    "location": "Nairobi, Kenya",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "KSh911k - KSh1.3m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 377,
    "initials": "LH",
    "title": "QA Engineer",
    "company": "Lattice HR",
    "location": "Port Harcourt, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "₦431k - ₦548k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 378,
    "initials": "GF",
    "title": "Data Analyst",
    "company": "Grainery Foods",
    "location": "Johannesburg, South Africa",
    "type": "Contract",
    "level": "Remote",
    "category": "Data",
    "salaryText": "R134k - R229k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 379,
    "initials": "FL",
    "title": "Senior Content Strategist",
    "company": "Fluxpay",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "₦465k - ₦727k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 380,
    "initials": "AA",
    "title": "Principal QA Lead",
    "company": "Anchor Analytics",
    "location": "Nairobi, Kenya",
    "type": "Freelance",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "KSh299k - KSh468k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 381,
    "initials": "IV",
    "title": "Compliance Officer",
    "company": "Ivorytech",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Legal",
    "salaryText": "₦212k - ₦303k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 382,
    "initials": "OV",
    "title": "Junior Support Team Lead",
    "company": "Outset Ventures",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "$172k - $287k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 383,
    "initials": "CO",
    "title": "Principal DevOps Engineer",
    "company": "Coralwave",
    "location": "Remote (Nigeria)",
    "type": "Full-time",
    "level": "Remote",
    "category": "DevOps",
    "salaryText": "₦1.2m - ₦2m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 384,
    "initials": "NO",
    "title": "Mid-level Data Analyst",
    "company": "Novapay",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦184k - ₦242k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 385,
    "initials": "FT",
    "title": "Junior Penetration Tester",
    "company": "Foundry Tech",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦462k - ₦642k / month",
    "salaryRank": "medium",
    "posted": "1 week"
  },
  {
    "id": 386,
    "initials": "AA",
    "title": "Principal Sales Development Representative",
    "company": "Anchor Analytics",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Sales",
    "salaryText": "₦723k - ₦935k / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 387,
    "initials": "IC",
    "title": "Lead Marketing Analyst",
    "company": "Ivory Consulting",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "₦960k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "3 weeks"
  },
  {
    "id": 388,
    "initials": "DS",
    "title": "People Operations Lead",
    "company": "Driftwood Studio",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "GH₵143k - GH₵258k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 389,
    "initials": "AA",
    "title": "Cloud Infrastructure Engineer",
    "company": "Anchor Analytics",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "£401k - £622k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 390,
    "initials": "JA",
    "title": "Senior Paralegal",
    "company": "Jetstream Air",
    "location": "Remote (Africa)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "$375k - $664k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 391,
    "initials": "ML",
    "title": "Junior Platform Engineer",
    "company": "Meridian Labs",
    "location": "Nairobi, Kenya",
    "type": "Part-time",
    "level": "Remote",
    "category": "Engineering",
    "salaryText": "KSh389k - KSh687k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 392,
    "initials": "JM",
    "title": "Mid-level Technical Product Manager",
    "company": "Junction Mobility",
    "location": "Ibadan, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "₦484k - ₦609k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 393,
    "initials": "GR",
    "title": "Lead Payroll Specialist",
    "company": "Greenpay",
    "location": "Abuja, Nigeria",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "₦1m - ₦1.4m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 394,
    "initials": "SA",
    "title": "Senior Motion Designer",
    "company": "Sablewood",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "On-site",
    "category": "Design",
    "salaryText": "$352k - $649k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 395,
    "initials": "RO",
    "title": "Regulatory Affairs Specialist",
    "company": "Rootcode",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "₦383k - ₦519k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 396,
    "initials": "CL",
    "title": "Mid-level Systems Administrator",
    "company": "Circuitry Labs",
    "location": "London, UK",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "£91k - £209k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 397,
    "initials": "MC",
    "title": "Mid-level QA Engineer",
    "company": "Marketplace Co",
    "location": "Abuja, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "₦447k - ₦592k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 398,
    "initials": "XM",
    "title": "Platform Engineer",
    "company": "Xylo Media",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Engineering",
    "salaryText": "₦90k - ₦174k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 399,
    "initials": "XM",
    "title": "Senior Contracts Manager",
    "company": "Xylo Media",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "₦512k - ₦753k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 400,
    "initials": "GR",
    "title": "Senior Payroll Specialist",
    "company": "Greenpay",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Finance",
    "salaryText": "$250k - $410k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 401,
    "initials": "RO",
    "title": "Lead QA Lead",
    "company": "Rootcode",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "₦881k - ₦1.2m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 402,
    "initials": "CE",
    "title": "Lead Operations Manager",
    "company": "Cedarline",
    "location": "Accra, Ghana",
    "type": "Full-time",
    "level": "Remote",
    "category": "Operations",
    "salaryText": "GH₵986k - GH₵1.9m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 403,
    "initials": "IC",
    "title": "Mid-level UI/UX Designer",
    "company": "Ivory Consulting",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote",
    "category": "Design",
    "salaryText": "R214k - R343k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 404,
    "initials": "ZL",
    "title": "Lead Editor",
    "company": "Ziplane Logistics",
    "location": "Remote (Nigeria)",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "₦424k - ₦588k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 405,
    "initials": "EV",
    "title": "Junior Manual Tester",
    "company": "Everstream",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "R118k - R168k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 406,
    "initials": "CL",
    "title": "Senior Data Engineer",
    "company": "Circuitry Labs",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦279k - ₦435k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 407,
    "initials": "SE",
    "title": "Senior Sales Executive",
    "company": "Solaris Energy",
    "location": "London, UK",
    "type": "Contract",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "£1.1m - £1.6m / month",
    "salaryRank": "high",
    "posted": "1 week"
  },
  {
    "id": 408,
    "initials": "NC",
    "title": "Principal Data Scientist",
    "company": "Nimbus Cloud",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "R740k - R1.3m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 409,
    "initials": "ML",
    "title": "Lead Growth Product Manager",
    "company": "Meridian Labs",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "On-site",
    "category": "Product",
    "salaryText": "RF711k - RF1.2m / month",
    "salaryRank": "high",
    "posted": "12 hours"
  },
  {
    "id": 410,
    "initials": "MC",
    "title": "Principal Cybersecurity Analyst",
    "company": "Marketplace Co",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "On-site",
    "category": "Security",
    "salaryText": "₦1.4m - ₦2.1m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 411,
    "initials": "EH",
    "title": "Junior Recruiter",
    "company": "Elevate HR",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Human Resources",
    "salaryText": "£127k - £263k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 412,
    "initials": "ND",
    "title": "Senior Site Reliability Engineer",
    "company": "Nettle Design",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "₦338k - ₦554k / month",
    "salaryRank": "medium",
    "posted": "Just now"
  },
  {
    "id": 413,
    "initials": "PC",
    "title": "Junior Finance Manager",
    "company": "Prosper Credit",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "₦107k - ₦176k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 414,
    "initials": "EM",
    "title": "Lead Growth Product Manager",
    "company": "Emberly",
    "location": "London, UK",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "£1.2m - £2m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 415,
    "initials": "WA",
    "title": "Junior Information Security Manager",
    "company": "Wavecrest",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Security",
    "salaryText": "₦152k - ₦258k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 416,
    "initials": "NO",
    "title": "Junior SEO Specialist",
    "company": "Novapay",
    "location": "Remote (Nigeria)",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "₦206k - ₦281k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 417,
    "initials": "BL",
    "title": "HR Business Partner",
    "company": "Bluepeak",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦181k - ₦323k / month",
    "salaryRank": "low",
    "posted": "3 weeks"
  },
  {
    "id": 418,
    "initials": "WA",
    "title": "Lead Product Manager",
    "company": "Wavecrest",
    "location": "London, UK",
    "type": "Part-time",
    "level": "On-site",
    "category": "Product",
    "salaryText": "£328k - £603k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 419,
    "initials": "RS",
    "title": "Mid-level Cybersecurity Analyst",
    "company": "Redwing Systems",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "₦172k - ₦273k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 420,
    "initials": "KL",
    "title": "Principal Operations Analyst",
    "company": "Kinetic Labs",
    "location": "London, UK",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Operations",
    "salaryText": "£1.4m - £2.1m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 421,
    "initials": "DF",
    "title": "Senior Visual Designer",
    "company": "Delta Freight",
    "location": "Abuja, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦285k - ₦404k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 422,
    "initials": "SU",
    "title": "Mid-level SEO Specialist",
    "company": "Suretrust",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Marketing",
    "salaryText": "R86k - R190k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 423,
    "initials": "SH",
    "title": "Lead Data Analyst",
    "company": "Solace Health",
    "location": "Remote (Global)",
    "type": "Part-time",
    "level": "On-site",
    "category": "Data",
    "salaryText": "$767k - $1.6m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 424,
    "initials": "ZE",
    "title": "Junior Product Owner",
    "company": "Zenlogix",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Product",
    "salaryText": "R449k - R714k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 425,
    "initials": "ZL",
    "title": "Principal HR Business Partner",
    "company": "Ziplane Logistics",
    "location": "Kigali, Rwanda",
    "type": "Part-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "RF1.2m - RF2m / month",
    "salaryRank": "high",
    "posted": "2 months"
  },
  {
    "id": 426,
    "initials": "GM",
    "title": "Design Lead",
    "company": "Glowmark Media",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "₦166k - ₦303k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 427,
    "initials": "ZE",
    "title": "Junior Growth Product Manager",
    "company": "Zenlogix",
    "location": "London, UK",
    "type": "Internship",
    "level": "Remote",
    "category": "Product",
    "salaryText": "£148k - £261k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 428,
    "initials": "QU",
    "title": "Junior Legal Counsel",
    "company": "Quillmark",
    "location": "Johannesburg, South Africa",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Legal",
    "salaryText": "R89k - R165k / month",
    "salaryRank": "low",
    "posted": "2 days"
  },
  {
    "id": 429,
    "initials": "LE",
    "title": "Senior Cloud Infrastructure Engineer",
    "company": "Lumos Education",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "₦288k - ₦457k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 430,
    "initials": "CL",
    "title": "Mid-level Help Desk Analyst",
    "company": "Circuitry Labs",
    "location": "Kano, Nigeria",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦300k - ₦419k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 431,
    "initials": "GF",
    "title": "Junior Design Systems Lead",
    "company": "Grainery Foods",
    "location": "Lagos, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "₦202k - ₦263k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 432,
    "initials": "LE",
    "title": "Principal Data Engineer",
    "company": "Lumos Education",
    "location": "London, UK",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "£858k - £1.7m / month",
    "salaryRank": "high",
    "posted": "5 days"
  },
  {
    "id": 433,
    "initials": "VA",
    "title": "Manual Tester",
    "company": "Vantage Africa",
    "location": "Kigali, Rwanda",
    "type": "Freelance",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "RF120k - RF252k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 434,
    "initials": "WA",
    "title": "Junior Marketing Manager",
    "company": "Wavecrest",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "R443k - R559k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 435,
    "initials": "TE",
    "title": "Senior BI Analyst",
    "company": "Terracore",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦396k - ₦505k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 436,
    "initials": "HM",
    "title": "Principal QA Automation Engineer",
    "company": "Highline Media",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "R382k - R554k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 437,
    "initials": "KD",
    "title": "Manual Tester",
    "company": "Kaleido Design",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "£216k - £340k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 438,
    "initials": "KL",
    "title": "Data Scientist",
    "company": "Kinetic Labs",
    "location": "Lagos, Nigeria",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦149k - ₦243k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 439,
    "initials": "FA",
    "title": "Senior Penetration Tester",
    "company": "Farmly",
    "location": "Nairobi, Kenya",
    "type": "Internship",
    "level": "On-site",
    "category": "Security",
    "salaryText": "KSh309k - KSh473k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 440,
    "initials": "CS",
    "title": "Customer Support Specialist",
    "company": "Cobalt Systems",
    "location": "Ibadan, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Customer Support",
    "salaryText": "₦140k - ₦258k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 441,
    "initials": "AR",
    "title": "Cybersecurity Analyst",
    "company": "Amberly Retail",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Security",
    "salaryText": "₦197k - ₦310k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 442,
    "initials": "LH",
    "title": "Senior Site Reliability Engineer",
    "company": "Lumen Health",
    "location": "Lagos, Nigeria",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "₦293k - ₦449k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 443,
    "initials": "GF",
    "title": "Systems Administrator",
    "company": "Grainery Foods",
    "location": "Nairobi, Kenya",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "DevOps",
    "salaryText": "KSh165k - KSh262k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 444,
    "initials": "ZT",
    "title": "Junior Help Desk Analyst",
    "company": "Zephyr Travel",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote",
    "category": "Customer Support",
    "salaryText": "£92k - £163k / month",
    "salaryRank": "low",
    "posted": "5 days"
  },
  {
    "id": 445,
    "initials": "DF",
    "title": "Senior Motion Designer",
    "company": "Dockside Freight",
    "location": "Remote (Africa)",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "$512k - $777k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 446,
    "initials": "FA",
    "title": "Senior Head of Sales",
    "company": "Farmly",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "₦277k - ₦518k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 447,
    "initials": "MF",
    "title": "Principal Security Engineer",
    "company": "Momentum Fitness",
    "location": "London, UK",
    "type": "Contract",
    "level": "Remote",
    "category": "Security",
    "salaryText": "£1.3m - £2m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 448,
    "initials": "IV",
    "title": "Product Owner",
    "company": "Ivorytech",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "GH₵214k - GH₵317k / month",
    "salaryRank": "low",
    "posted": "2 weeks"
  },
  {
    "id": 449,
    "initials": "FA",
    "title": "Customer Support Specialist",
    "company": "Farmly",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Customer Support",
    "salaryText": "$144k - $291k / month",
    "salaryRank": "low",
    "posted": "1 day"
  },
  {
    "id": 450,
    "initials": "LA",
    "title": "Learning & Development Manager",
    "company": "Longview Analytics",
    "location": "Johannesburg, South Africa",
    "type": "Full-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "R174k - R310k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 451,
    "initials": "GM",
    "title": "Lead Copywriter",
    "company": "Glowmark Media",
    "location": "Enugu, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "₦1.4m - ₦2.3m / month",
    "salaryRank": "high",
    "posted": "1 month"
  },
  {
    "id": 452,
    "initials": "IV",
    "title": "Junior Growth Product Manager",
    "company": "Ivorytech",
    "location": "Abuja, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Product",
    "salaryText": "₦122k - ₦255k / month",
    "salaryRank": "low",
    "posted": "1 week"
  },
  {
    "id": 453,
    "initials": "AR",
    "title": "Principal Email Marketing Specialist",
    "company": "Amberly Retail",
    "location": "Remote (Global)",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "$817k - $1.1m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 454,
    "initials": "KB",
    "title": "Logistics Coordinator",
    "company": "Keystone Bank",
    "location": "Kano, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "₦410k - ₦663k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 455,
    "initials": "HA",
    "title": "Senior Content Writer",
    "company": "Havenly",
    "location": "Cape Town, South Africa",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "R835k - R1.7m / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 456,
    "initials": "DS",
    "title": "Growth Marketer",
    "company": "Driftwood Studio",
    "location": "Ibadan, Nigeria",
    "type": "Internship",
    "level": "Remote",
    "category": "Marketing",
    "salaryText": "₦208k - ₦263k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 457,
    "initials": "JB",
    "title": "Senior Systems Administrator",
    "company": "Jubilee Bank",
    "location": "Remote (Africa)",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "$308k - $500k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 458,
    "initials": "FA",
    "title": "Lead Release Manager",
    "company": "Farmly",
    "location": "Kigali, Rwanda",
    "type": "Internship",
    "level": "Hybrid",
    "category": "DevOps",
    "salaryText": "RF467k - RF713k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 459,
    "initials": "ZL",
    "title": "Mid-level Bookkeeper",
    "company": "Ziplane Logistics",
    "location": "Port Harcourt, Nigeria",
    "type": "Freelance",
    "level": "Hybrid",
    "category": "Finance",
    "salaryText": "₦396k - ₦559k / month",
    "salaryRank": "medium",
    "posted": "2 weeks"
  },
  {
    "id": 460,
    "initials": "FA",
    "title": "Data Analyst",
    "company": "Farmly",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "GH₵414k - GH₵646k / month",
    "salaryRank": "medium",
    "posted": "4 days"
  },
  {
    "id": 461,
    "initials": "SH",
    "title": "Junior Graphic Designer",
    "company": "Solace Health",
    "location": "Ibadan, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Design",
    "salaryText": "₦146k - ₦289k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 462,
    "initials": "BR",
    "title": "Junior Product Designer",
    "company": "Brightloop",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Design",
    "salaryText": "₦393k - ₦586k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 463,
    "initials": "GL",
    "title": "Principal Manual Tester",
    "company": "Gridiron Logistics",
    "location": "London, UK",
    "type": "Freelance",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "£821k - £1.7m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 464,
    "initials": "TE",
    "title": "Lead QA Automation Engineer",
    "company": "Terracore",
    "location": "Johannesburg, South Africa",
    "type": "Internship",
    "level": "On-site",
    "category": "Quality Assurance",
    "salaryText": "R718k - R959k / month",
    "salaryRank": "high",
    "posted": "3 hours"
  },
  {
    "id": 465,
    "initials": "NA",
    "title": "Junior Illustrator",
    "company": "Naijacart",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "₦145k - ₦203k / month",
    "salaryRank": "low",
    "posted": "3 hours"
  },
  {
    "id": 466,
    "initials": "HI",
    "title": "Lead Content Marketing Manager",
    "company": "Hearthstone Insure",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "GH₵448k - GH₵724k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 467,
    "initials": "EH",
    "title": "Principal Visual Designer",
    "company": "Elevate HR",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Design",
    "salaryText": "R1.4m - R2.1m / month",
    "salaryRank": "high",
    "posted": "2 days"
  },
  {
    "id": 468,
    "initials": "TF",
    "title": "Content Strategist",
    "company": "Trove Finance",
    "location": "Accra, Ghana",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Content",
    "salaryText": "GH₵260k - GH₵511k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 469,
    "initials": "HA",
    "title": "Junior Technical Support Engineer",
    "company": "Harborlight",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Customer Support",
    "salaryText": "₦427k - ₦540k / month",
    "salaryRank": "medium",
    "posted": "5 hours"
  },
  {
    "id": 470,
    "initials": "BA",
    "title": "Full-Stack Developer",
    "company": "Basecamp Africa",
    "location": "Cape Town, South Africa",
    "type": "Internship",
    "level": "Hybrid",
    "category": "Engineering",
    "salaryText": "R203k - R302k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 471,
    "initials": "BR",
    "title": "Manual Tester",
    "company": "Brightloop",
    "location": "Cape Town, South Africa",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Quality Assurance",
    "salaryText": "R188k - R244k / month",
    "salaryRank": "low",
    "posted": "12 hours"
  },
  {
    "id": 472,
    "initials": "HM",
    "title": "Principal Design Lead",
    "company": "Highline Media",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "On-site",
    "category": "Design",
    "salaryText": "₦1.1m - ₦1.3m / month",
    "salaryRank": "high",
    "posted": "5 hours"
  },
  {
    "id": 473,
    "initials": "BR",
    "title": "Operations Analyst",
    "company": "Brightloop",
    "location": "Ibadan, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Operations",
    "salaryText": "₦127k - ₦273k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 474,
    "initials": "PC",
    "title": "Information Security Manager",
    "company": "Prosper Credit",
    "location": "Kano, Nigeria",
    "type": "Full-time",
    "level": "Remote-friendly",
    "category": "Security",
    "salaryText": "₦114k - ₦223k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 475,
    "initials": "HA",
    "title": "Mid-level HR Manager",
    "company": "Harborlight",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Human Resources",
    "salaryText": "₦282k - ₦486k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 476,
    "initials": "VA",
    "title": "Junior Product Designer",
    "company": "Vantage Africa",
    "location": "Port Harcourt, Nigeria",
    "type": "Part-time",
    "level": "Remote",
    "category": "Design",
    "salaryText": "₦532k - ₦771k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 477,
    "initials": "QU",
    "title": "Senior Learning & Development Manager",
    "company": "Quillmark",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦267k - ₦551k / month",
    "salaryRank": "medium",
    "posted": "3 weeks"
  },
  {
    "id": 478,
    "initials": "CO",
    "title": "Junior Information Security Manager",
    "company": "Coralwave",
    "location": "Kigali, Rwanda",
    "type": "Full-time",
    "level": "Remote",
    "category": "Security",
    "salaryText": "RF201k - RF347k / month",
    "salaryRank": "low",
    "posted": "4 days"
  },
  {
    "id": 479,
    "initials": "BR",
    "title": "Mid-level Mobile Developer (Android)",
    "company": "Brightloop",
    "location": "Remote (Global)",
    "type": "Internship",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "$327k - $486k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 480,
    "initials": "DS",
    "title": "Junior Data Scientist",
    "company": "Driftwood Studio",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "R486k - R714k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 481,
    "initials": "CR",
    "title": "Talent Acquisition Specialist",
    "company": "Craftworks",
    "location": "Johannesburg, South Africa",
    "type": "Part-time",
    "level": "On-site",
    "category": "Human Resources",
    "salaryText": "R135k - R282k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 482,
    "initials": "PA",
    "title": "Principal Bookkeeper",
    "company": "Parcelnow",
    "location": "Lagos, Nigeria",
    "type": "Freelance",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "₦514k - ₦681k / month",
    "salaryRank": "medium",
    "posted": "1 month"
  },
  {
    "id": 483,
    "initials": "BA",
    "title": "Mid-level Cybersecurity Analyst",
    "company": "Basecamp Africa",
    "location": "Accra, Ghana",
    "type": "Freelance",
    "level": "On-site",
    "category": "Security",
    "salaryText": "GH₵81k - GH₵163k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 484,
    "initials": "ZL",
    "title": "Mid-level Growth Marketer",
    "company": "Ziplane Logistics",
    "location": "Enugu, Nigeria",
    "type": "Internship",
    "level": "On-site",
    "category": "Marketing",
    "salaryText": "₦119k - ₦183k / month",
    "salaryRank": "low",
    "posted": "Just now"
  },
  {
    "id": 485,
    "initials": "YC",
    "title": "Senior Machine Learning Engineer",
    "company": "Yield Capital",
    "location": "Port Harcourt, Nigeria",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "₦366k - ₦546k / month",
    "salaryRank": "medium",
    "posted": "1 day"
  },
  {
    "id": 486,
    "initials": "BI",
    "title": "Principal Content Marketing Manager",
    "company": "Beacon Insure",
    "location": "Abuja, Nigeria",
    "type": "Freelance",
    "level": "On-site",
    "category": "Content",
    "salaryText": "₦919k - ₦1.5m / month",
    "salaryRank": "high",
    "posted": "Just now"
  },
  {
    "id": 487,
    "initials": "BI",
    "title": "Lead Sales Executive",
    "company": "Beacon Insure",
    "location": "Nairobi, Kenya",
    "type": "Contract",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "KSh284k - KSh397k / month",
    "salaryRank": "medium",
    "posted": "2 days"
  },
  {
    "id": 488,
    "initials": "ML",
    "title": "Principal Release Manager",
    "company": "Meridian Labs",
    "location": "Remote (Global)",
    "type": "Contract",
    "level": "On-site",
    "category": "DevOps",
    "salaryText": "$360k - $474k / month",
    "salaryRank": "medium",
    "posted": "12 hours"
  },
  {
    "id": 489,
    "initials": "DF",
    "title": "Junior Supply Chain Analyst",
    "company": "Delta Freight",
    "location": "Ibadan, Nigeria",
    "type": "Part-time",
    "level": "On-site",
    "category": "Operations",
    "salaryText": "₦119k - ₦264k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 490,
    "initials": "PR",
    "title": "Principal Machine Learning Engineer",
    "company": "Pinnacle Retail",
    "location": "Cape Town, South Africa",
    "type": "Contract",
    "level": "Remote-friendly",
    "category": "Data",
    "salaryText": "R1m - R1.5m / month",
    "salaryRank": "high",
    "posted": "3 days"
  },
  {
    "id": 491,
    "initials": "RI",
    "title": "Mid-level SEO Specialist",
    "company": "Riverstone",
    "location": "Remote (Africa)",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Marketing",
    "salaryText": "$370k - $658k / month",
    "salaryRank": "medium",
    "posted": "3 hours"
  },
  {
    "id": 492,
    "initials": "FL",
    "title": "Principal Recruiter",
    "company": "Fluxpay",
    "location": "Kano, Nigeria",
    "type": "Contract",
    "level": "Hybrid",
    "category": "Human Resources",
    "salaryText": "₦400k - ₦507k / month",
    "salaryRank": "medium",
    "posted": "5 days"
  },
  {
    "id": 493,
    "initials": "MC",
    "title": "Junior Sales Executive",
    "company": "Marketplace Co",
    "location": "Port Harcourt, Nigeria",
    "type": "Full-time",
    "level": "Remote",
    "category": "Sales",
    "salaryText": "₦212k - ₦311k / month",
    "salaryRank": "low",
    "posted": "2 months"
  },
  {
    "id": 494,
    "initials": "KD",
    "title": "Lead Software Engineer",
    "company": "Kaleido Design",
    "location": "Nairobi, Kenya",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Engineering",
    "salaryText": "KSh748k - KSh1.4m / month",
    "salaryRank": "high",
    "posted": "4 days"
  },
  {
    "id": 495,
    "initials": "AA",
    "title": "Lead QA Engineer",
    "company": "Anchor Analytics",
    "location": "Lagos, Nigeria",
    "type": "Full-time",
    "level": "Hybrid",
    "category": "Quality Assurance",
    "salaryText": "₦1.1m - ₦1.6m / month",
    "salaryRank": "high",
    "posted": "2 weeks"
  },
  {
    "id": 496,
    "initials": "JB",
    "title": "Senior Controller",
    "company": "Jubilee Bank",
    "location": "Remote (Nigeria)",
    "type": "Freelance",
    "level": "Remote",
    "category": "Finance",
    "salaryText": "₦278k - ₦410k / month",
    "salaryRank": "medium",
    "posted": "3 days"
  },
  {
    "id": 497,
    "initials": "JA",
    "title": "Mid-level Software Engineer",
    "company": "Jetstream Air",
    "location": "Accra, Ghana",
    "type": "Part-time",
    "level": "On-site",
    "category": "Engineering",
    "salaryText": "GH₵214k - GH₵322k / month",
    "salaryRank": "low",
    "posted": "5 hours"
  },
  {
    "id": 498,
    "initials": "PA",
    "title": "Copywriter",
    "company": "Palmly",
    "location": "Remote (Nigeria)",
    "type": "Internship",
    "level": "Remote-friendly",
    "category": "Content",
    "salaryText": "₦81k - ₦204k / month",
    "salaryRank": "low",
    "posted": "1 month"
  },
  {
    "id": 499,
    "initials": "DF",
    "title": "Junior Sales Development Representative",
    "company": "Dockside Freight",
    "location": "Accra, Ghana",
    "type": "Internship",
    "level": "On-site",
    "category": "Sales",
    "salaryText": "GH₵154k - GH₵295k / month",
    "salaryRank": "low",
    "posted": "3 days"
  },
  {
    "id": 500,
    "initials": "EH",
    "title": "Content Writer",
    "company": "Elevate HR",
    "location": "Enugu, Nigeria",
    "type": "Full-time",
    "level": "On-site",
    "category": "Content",
    "salaryText": "₦171k - ₦274k / month",
    "salaryRank": "low",
    "posted": "4 days"
  }
]

function buildJobs(originals, pageCount) {
  const jobs = []
  const repeatCount = (pageCount * 5) / originals.length
  for (let page = 0; page < repeatCount; page += 1) {
    originals.forEach((job, index) => {
      jobs.push({
        ...job,
        id: page * originals.length + index + 1
      })
    })
  }
  return jobs
}

export default {
  name: 'JobView',
  components: {
    HeaderB,
    Footer
  },
  data() {
    return {
      searchQuery: '',
      locationQuery: '',
      selectedCategory: '',
      selectedJobTypes: [],
      selectedExperience: '',
      selectedSalaryRanges: [],
      sortBy: 'newest',
      currentPage: 1,
      pageSize: 5,
      jobs: buildJobs(originalJobs, 20)
    }
  },
  computed: {
    ...mapState(useJobhuntStore, ['savedJobs', 'savedJobsCount']),
    filteredJobs() {
      const search = this.searchQuery.toLowerCase().trim()
      const location = this.locationQuery.toLowerCase().trim()

      return this.jobs
        .filter((job) => {
          const matchesSearch = !search || [job.title, job.company, job.category]
            .some((field) => field.toLowerCase().includes(search))
          const matchesLocation = !location || job.location.toLowerCase().includes(location)
          const matchesCategory = !this.selectedCategory || job.category.toLowerCase() === this.selectedCategory.toLowerCase()
          const matchesType = !this.selectedJobTypes.length || this.selectedJobTypes.includes(job.type)
          const matchesExperience = !this.selectedExperience || job.level === this.selectedExperience
          const matchesSalary = !this.selectedSalaryRanges.length || this.selectedSalaryRanges.includes(job.salaryRank)
          return matchesSearch && matchesLocation && matchesCategory && matchesType && matchesExperience && matchesSalary
        })
        .sort((a, b) => {
          if (this.sortBy === 'salary') {
            return b.salaryRank.localeCompare(a.salaryRank)
          }
          if (this.sortBy === 'newest') {
            return a.id - b.id
          }
          return 0
        })
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredJobs.slice(start, start + this.pageSize)
    },
    pageCount() {
      return Math.max(1, Math.ceil(this.filteredJobs.length / this.pageSize))
    }
  },
  watch: {
    filteredJobs() {
      if (this.currentPage > this.pageCount) {
        this.currentPage = this.pageCount
      }
    }
  },
  methods: {
    ...mapActions(useJobhuntStore, ['toggleSavedJob', 'applyForJob']),
    resetFilters() {
      this.searchQuery = ''
      this.locationQuery = ''
      this.selectedCategory = ''
      this.selectedJobTypes = []
      this.selectedExperience = ''
      this.selectedSalaryRanges = []
      this.sortBy = 'newest'
      this.currentPage = 1
    },
    clearAll() {
      this.searchQuery = ''
      this.locationQuery = ''
      this.selectedCategory = ''
      this.currentPage = 1
    },
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage += 1
      }
    },
    setCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
    }
  }
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .jobpage {
    min-height: 100dvh;
    background-color: #071a29;
  }

.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.sec1{
    display: block;
    height: 290px;
    padding: 100px 150px;
    padding-bottom:4px;
    margin-left: 80px;
    gap: 0;
    


  h3{
    margin-top: 50px;
    font-size: 12px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: lighter;
    color: orange;
    padding: 0;
    margin: 0;
  }

  h2{
    font-size: 38px;
    font-family: sans-serif;
    font-weight: bold;
    color: #fff;
    padding: 0;
  }

  .place3{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4;
    width: 850px;
    height: 50px;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px 20px;
  
    input{
      width: 50%;
      height: 100%;
      border:0px solid black;
      padding: 1px 16px;
      font-size: 15px;
    }

    input:focus {
    outline: none;
    box-shadow: none;
    }

    .placeIn{
      display: flex;
      justify-content: space-between;
      gap: 160px;
      text-align: center;
      border-left: 1x solid #071a29;

      input{
        padding-top: 10px;
        text-align: center;
      }
    }
  }
}

.placetxt{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #00000087;
  text-align: center;
  text-wrap: nowrap;

  hr{
    background-color: #071a29;
    width: 30px;
    height: 1px;
    padding: 0px, 25px;
  }
}

.search{
  background-color: orange;
  width: 70px;
  height: 80;
  border: none;
  border-radius: 4px;
  text-align: center;
  padding: 10px;
  font-weight: bolder;
  cursor: pointer;
}

.sec2{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  background: linear-gradient(135deg, rgba(227, 228, 230, 0.4), rgba(245, 238, 238, 0.039));
  background-color: #d2efff;
  background-color: #fff;
  padding: 20px;

  .part{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
  }

  .part1 ul{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 20px
  }
  .part1 ul li, a {
    background-color: #d2efff;
    list-style: none;
    color: #071a29;
    text-decoration: none;
    padding: 10px;
    border-radius: 18px;
  }

  .part1 ul li.active {
    background-color: #071a29;
    color: #fff;
  }

  .part1 ul li.active a {
    background-color: #071a29;
    color: #fff;
  }

  .part2{
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .filter{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .filterheader{
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;

    .clear{
      color: orange;
      text-wrap: nowrap;
      cursor: pointer;
    }
  }

  .inputp{
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .partA{
    width:40%;
    padding: 0px;
  }
  .partB{
    min-width: 100%;
    width:500px;
    padding: 0px;
  }
  
  .vacancyheader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 260px;
    margin-left: 20px;
  }
  #sortby{
    height: 35px;
    color: #071a29;
    width: 190px;
    align-items: flex-end;
    padding: 5px 10px;
    border: 1.5px solid #071a29;
    border-radius: 6px;
  }
  .jobplate{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: start;
    border: 1px solid #12568a3b;
    border-radius: 15px;
    padding: 10px 20px;
    width: 100%;
    margin: 20px;

    .comp-abb{
      background-color: #d2efff;
      font-weight: bolder;
      font-size: 30px;
      padding: 10px;
      border-radius: 8px;
    }
  }
  .comp-detail ul{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    padding: 0px;
    width: 100%;
  }

  .comp-detail ul li{
    list-style: none;
    background-color: #d2efff;
    padding: 10px 15px;
    border-radius: 5px;
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    padding: 16px 0;
    margin: 0;
    list-style: none;
  }

  .pagination-controls .page-item {
    margin: 0;
  }

  .pagination-controls .nav-button {
    border: 1px solid #071a29;
    background-color: #071a29;
    color: #fff;
    cursor: pointer;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    transition: background-color 0.15s ease, transform 0.15s ease;
  }

  .pagination-controls .nav-item.disabled .nav-button {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }

  .pagination-controls .current-page-label {
    min-width: 32px;
    text-align: center;
    font-weight: 700;
    color: #071a29;
    font-size: 14px;
  }
}

.fav{
  display: grid;
  justify-content: space-between;
  gap: 10px;
  align-items: center;


  .save-job-btn,
  .apply-job-btn{
    background-color: #071a29;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  .save-job-btn:active{
    background-color: #12568a;
  }
  .apply-job-btn:hover {
    background-color: #12568a;
  }

}
</style>
