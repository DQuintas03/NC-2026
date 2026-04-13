import requests
import sys
from datetime import datetime

class SimplifiedTUBAPITester:
    def __init__(self, base_url="https://hub-analise-tub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, expected_fields=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}/"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"✅ Passed - Status: {response.status_code}")
                    
                    # Check expected fields if provided
                    if expected_fields:
                        for field in expected_fields:
                            if field not in response_data:
                                print(f"⚠️  Warning: Expected field '{field}' not found in response")
                            else:
                                print(f"   ✓ Field '{field}' present: {response_data[field]}")
                    
                    self.tests_passed += 1
                    return True, response_data
                except Exception as json_error:
                    print(f"❌ Failed - JSON parsing error: {str(json_error)}")
                    print(f"   Raw response: {response.text[:200]}...")
                    self.failed_tests.append(f"{name}: JSON parsing failed")
                    return False, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append(f"{name}: Status {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append(f"{name}: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            ["message"]
        )

    def test_health_endpoint(self):
        """Test health endpoint"""
        return self.run_test(
            "Health Check",
            "GET", 
            "health",
            200,
            ["status"]
        )

    def test_removed_endpoints(self):
        """Test that removed endpoints return 404 or redirect"""
        removed_endpoints = [
            "overview",
            "kpis/acertos", 
            "kpis/trocas",
            "kpis/faltas",
            "upload-stats",
            "upload/acertos",
            "data/acertos"
        ]
        
        print(f"\n🔍 Testing Removed Endpoints (should return 404)...")
        
        for endpoint in removed_endpoints:
            url = f"{self.api_url}/{endpoint}"
            print(f"   Testing: {url}")
            
            try:
                response = requests.get(url, headers={'Content-Type': 'application/json'}, timeout=10)
                
                if response.status_code == 404:
                    print(f"   ✅ {endpoint} correctly returns 404")
                    self.tests_passed += 1
                else:
                    print(f"   ❌ {endpoint} returns {response.status_code} (expected 404)")
                    self.failed_tests.append(f"Removed endpoint {endpoint}: Status {response.status_code}")
                
                self.tests_run += 1
                
            except Exception as e:
                print(f"   ❌ {endpoint} error: {str(e)}")
                self.failed_tests.append(f"Removed endpoint {endpoint}: {str(e)}")
                self.tests_run += 1

def main():
    print("🚀 Starting Simplified TUB API Testing...")
    print("=" * 60)
    print("Testing simplified backend with only / and /health endpoints")
    print("=" * 60)
    
    # Setup
    tester = SimplifiedTUBAPITester()
    
    # Run core tests
    print("\n📋 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    tester.test_health_endpoint()
    
    # Test that removed endpoints are gone
    print("\n🗑️  Testing Removed Endpoints...")
    tester.test_removed_endpoints()

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS:")
    print(f"   Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed tests:")
        for failed_test in tester.failed_tests:
            print(f"   - {failed_test}")
    else:
        print(f"\n✅ All tests passed!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())