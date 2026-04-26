import { test, expect } from '@playwright/test';

test.describe('Patient Portal E2E', () => {

  test('New patient onboarding flow', async ({ page }) => {
    // 1. Visit Home & Navigate to Signup
    await page.goto('/');
    await expect(page).toHaveTitle(/Dental|SaaS|temp/i);
    
    // Check elements on Landing Page
    await expect(page.getByText(/Smart Dental Care/i)).toBeVisible();
    
    // 2. Signup
    await page.goto('/signup');
    await expect(page.getByText('Create Account')).toBeVisible();
    
    // Create random email to avoid collision
    const randomEmail = `test${Date.now()}@example.com`;
    const randomPhone = `555${Math.floor(1000000 + Math.random() * 9000000)}`;

    // Mock Signup submission
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', randomPhone);
    await page.fill('input[name="password"]', 'StrongPass123!');
    
    await page.click('button[type="submit"]');
    
    // 3. Verify Email -> Mock Intake Flow
    await page.waitForURL('**/verify-email');
    await expect(page.getByText('Verify your email')).toBeVisible();
    
    await page.click('text=Continue to Intake');
    
    // 4. Intake Wizard Step 1: Personal
    await page.waitForURL('**/intake');
    await expect(page.getByText('Patient Intake')).toBeVisible();
    
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'Patient');
    await page.click('text=Next');
    
    // Step 2: Medical
    await expect(page.getByText('Medical History')).toBeVisible();
    await page.click('text=Next');
    
    // Step 3: Dental
    await expect(page.getByText('Dental Intake')).toBeVisible();
    await page.click('text=Complete Profile');
    
    // Step 4: Success
    await expect(page.getByText('Profile Completed!')).toBeVisible();
    await page.click('text=Go to Dashboard');
    
    // 5. Dashboard View
    await page.waitForURL('**/dashboard');
    await expect(page.getByText(/Welcome/i)).toBeVisible();
  });

  test('Appointment booking flow', async ({ page }) => {
    // Navigate and mock session using a login
    await page.goto('/signup');
    const randomEmail = `book${Date.now()}@example.com`;
    const randomPhone = `555${Math.floor(1000000 + Math.random() * 9000000)}`;
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', randomPhone);
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/verify-email');
    
    // Click Book
    await page.goto('/book');
    
    // Step 1: Select Doctor
    await page.click('text=Select Doctor >> nth=0');
    
    // Step 2: Date & Slot
    await expect(page.getByText('Select Date')).toBeVisible();
    
    // Pick tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    
    await page.fill('input[type="date"]', `${yyyy}-${mm}-${dd}`);
    await page.click('text=09:00 AM');
    await page.fill('textarea', 'General Checkup Routine');
    
    await page.click('text=Continue to Summary');
    
    // Step 3: Summary
    await expect(page.getByText('Appointment Summary')).toBeVisible();
    await page.click('text=Confirm Booking');
    
    // Step 4: Success
    await expect(page.getByText('Booking Confirmed!')).toBeVisible();
  });

  test('Medical history viewing', async ({ page }) => {
    // Navigate and mock session using a login
    await page.goto('/signup');
    const randomEmail = `history${Date.now()}@example.com`;
    const randomPhone = `555${Math.floor(1000000 + Math.random() * 9000000)}`;
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="phone"]', randomPhone);
    await page.fill('input[name="password"]', 'StrongPass123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/verify-email');

    await page.goto('/history');
    
    await expect(page.getByText('Medical History')).toBeVisible();
    await expect(page.getByPlaceholder('Search records...')).toBeVisible();
    
    // Check one record is visible
    await expect(page.getByText('General Checkup').first()).toBeVisible();
    
    // Expand record
    await page.click('text=View Details');
    
    // Assert clinical notes expand
    await expect(page.getByText('Clinical Notes')).toBeVisible();
    await expect(page.getByText('Treatments Performed')).toBeVisible();
  });

});
